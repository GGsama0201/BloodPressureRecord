export default {
  async fetch(request: Request, env: any, ctx: any) {
    try {
      // Try to use ASSETS binding if available
      if (env.ASSETS) {
        return await env.ASSETS.fetch(request);
      }
      
      // Fallback: return a simple response
      return new Response('ASSETS binding not available', { status: 500 });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Worker error: ' + (error instanceof Error ? error.message : String(error)), {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};
