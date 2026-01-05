# Configure Caching in Azure Front Door

To configure caching for Azure Front Door, sign in to the Azure portal, navigate to your Front Door profile, select Front Door manager, choose your route, and then select Enable caching. You can specify the query string caching behavior and optionally enable compression. Azure Front Door will then cache assets at the edge, serving subsequent requests from the cache for improved performance.

## Steps to Enable Caching

1. **Sign in to the Azure portal**: and locate your Azure Front Door profile.
2. **Select Front Door manager**: and then choose your desired route.
3. **Select Enable caching**: from the route settings.
4. **Specify the query string caching behavior**: This setting determines how Front Door handles cached responses when query strings are present in the request.
    - **Honor Origin**: Front Door respects the Cache-Control headers from the origin.
    - **Override Always**: Front Door ignores origin headers and applies the specified cache duration.
    - **Override if Origin Missing**: Front Door applies the specified duration only if the origin doesn't provide caching instructions.
5. **Optionally, enable compression**: You can also select to enable compression for Front Door to compress responses to clients, further improving performance.
6. **Select Update**: to save your changes.

## Video

This video demonstrates how to enable caching in Azure Front Door:

[55s - YouTube - 16 Feb 2025](https://www.youtube.com/watch?v=cB-jlc6aWXA&t=369)

## How Caching Works

- Azure Front Door caches static and dynamic content at its edge locations.
- The first request for an asset is served by the origin, but subsequent requests for the same asset are served from the cache, reducing latency and origin load.
- Caching continues until the asset's time-to-live (TTL) expires, at which point Front Door retrieves a refreshed copy from the origin and stores it in the cache for the next request.

## Best Practices for Cache Management

- **Version your assets**: For critical updates, version your assets and publish them with new URLs.
- **Use the Rules Engine**: For advanced scenarios, use the Rules Engine to customize caching behavior based on specific request patterns.
- **Manage cache duration**: Configure a suitable cache duration, which can be up to 366 days for "Override Always" or "Override if Origin Missing" behaviors.
