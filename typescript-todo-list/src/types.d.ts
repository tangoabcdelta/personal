

// Discriminated unions
interface LoadingState {
    status: "loading";
}

interface SuccessState {
    status: "success";
    data: User[];
}

interface ErrorState {
    status: "error";
    error: string;
}

// The discriminated union type
type ApiResponse = LoadingState | SuccessState | ErrorState;

interface User {
    name: string;
    age: number;
}