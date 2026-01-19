import pdfplumber
import pandas as pd
import re
from datetime import datetime
from collections import defaultdict
import os

def parse_phonepe_pdf(pdf_path):
    """
    Parses PhonePe statement PDF -> DataFrame with columns:
    date, time, type (DEBIT/CREDIT), amount, merchant, txn_id, utr, paid_by
    """
    transactions = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            text = page.extract_text()
            if not text:
                continue
            
            # Split into lines
            lines = text.split('\n')
            i = 0
            while i < len(lines):
                line = lines[i].strip()
                
                # Match date pattern: "Jan 04, 2026" or "Dec 31, 2025"
                date_match = re.match(r'([A-Za-z]{3}\s+\d{1,2},?\s+\d{4})', line)
                if date_match:
                    date_str = date_match.group(1)
                    try:
                        # Parse date (handles "Jan 04, 2026" or "Dec 31, 2025")
                        date = pd.to_datetime(date_str, format='%b %d, %Y')
                    except:
                        date = pd.to_datetime(date_str, format='%B %d, %Y')
                    
                    # Next line usually has time
                    i += 1
                    if i < len(lines):
                        time_line = lines[i].strip()
                        time_match = re.search(r'(\d{1,2}�?\d{1,2}\s+(AM|PM))', time_line)
                        time_str = time_match.group(1) if time_match else 'Unknown'
                        
                        # Next lines: DEBIT/CREDIT + amount
                        i += 1
                        while i < len(lines) and 'DEBIT' not in lines[i] and 'CREDIT' not in lines[i]:
                            i += 1
                        
                        if i < len(lines):
                            txn_line = lines[i].strip()
                            type_match = re.search(r'(DEBIT|CREDIT)', txn_line)
                            amount_match = re.search(r'₹([\d,]+\.?\d*)', txn_line)
                            
                            txn_type = type_match.group(1) if type_match else 'Unknown'
                            amount = float(amount_match.group(1).replace(',', '')) if amount_match else 0
                            
                            # Merchant usually after amount
                            merchant_match = re.search(r'Paid to\s+([A-Za-z\s]+?)(?:\s+Transaction|$)', txn_line)
                            merchant = merchant_match.group(1).strip() if merchant_match else 'Unknown'
                            
                            transactions.append({
                                'date': date,
                                'time': time_str,
                                'type': txn_type,
                                'amount': amount if txn_type == 'DEBIT' else -amount,
                                'merchant': merchant,
                                'raw_line': txn_line,
                                'page': page_num + 1
                            })
                    i += 1
                else:
                    i += 1
    
    df = pd.DataFrame(transactions)
    if not df.empty:
        df['month'] = df['date'].dt.to_period('M')
        df['category'] = categorize_merchant(df['merchant'])
    
    return df

def categorize_merchant(merchant):
    """Simple merchant categorization"""
    merchant_lower = merchant.lower()
    if any(x in merchant_lower for x in ['blinkit', 'amazon pay groceries', 'flipkart']):
        return 'Groceries'
    elif any(x in merchant_lower for x in ['medical', 'hospital', 'pharmacy']):
        return 'Medical'
    elif any(x in merchant_lower for x in ['indmoney', 'groww']):
        return 'Investments'
    elif any(x in merchant_lower for x in ['flipkart', 'meesho', 'amazon']):
        return 'Shopping'
    else:
        return 'Other'

# Usage
if __name__ == "__main__":
    pdf_path = "PhonePe_Statement_Jul2025_Jan2026.pdf"  # Your file
    
    df = parse_phonepe_pdf(pdf_path)
    
    # Save to Excel with sheets
    with pd.ExcelWriter('phonepe_analysis.xlsx', engine='openpyxl') as writer:
        df.to_excel(writer, sheet_name='All_Transactions', index=False)
        
        # Monthly summary
        monthly = df.groupby('month')['amount'].agg(['sum', 'count', 'mean']).round(2)
        monthly.to_excel(writer, sheet_name='Monthly_Summary')
        
        # Category summary
        category_summary = df[df['type'] == 'DEBIT'].groupby(['month', 'category'])['amount'].sum().unstack(fill_value=0).round(2)
        category_summary.to_excel(writer, sheet_name='Category_Breakdown')
    
    print(f"✅ Parsed {len(df)} transactions!")
    print("\nMonthly spend (DEBIT only):")
    print(df[df['type'] == 'DEBIT'].groupby('month')['amount'].sum().round(2))
    
    print("\nTop merchants (DEBIT only):")
    print(df[df['type'] == 'DEBIT'].groupby('merchant')['amount'].sum().nlargest(10).round(2))
