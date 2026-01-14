export default {
  async fetch(request: Request, env: any, ctx: any) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname === '/' ? '/index.html' : url.pathname;

      // Use ASSETS binding to serve static files
      if (env.ASSETS) {
        const assetResponse = await env.ASSETS.fetch(new Request(new URL(pathname, request.url), request));
        if (assetResponse.status !== 404) {
          return assetResponse;
        }
      }

      // Fallback: serve index.html for root path
      if (url.pathname === '/' || url.pathname === '') {
        if (env.ASSETS) {
          return await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
        }
      }

      return new Response('Not Found', { status: 404 });
    } catch (error) {
      console.error('Error:', error);
      return new Response('Server Error: ' + (error instanceof Error ? error.message : String(error)), { status: 500 });
    }
  }
};
