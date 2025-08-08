import { publishToZohoFlow } from './zohoFlowPublisher.js';
import routes from './config/routes.js';
import templates from './config/templates.js';

const destinations = {
  zoho_flow: publishToZohoFlow,
};

export async function dispatchIntegration(event) {
  const actions = routes[event.eventType] || [{ type: 'webhook', destination: 'zoho_flow' }];
  for (const action of actions) {
    if (action.type === 'webhook') {
      const publisher = destinations[action.destination] || publishToZohoFlow;
      // Allow action-level payload builder override
      const payload = action.payloadBuilder ? action.payloadBuilder(event.payload) : event.payload;
      await publisher({ ...event, payload });
    } else if (action.type === 'email') {
      if (process.env.ZEPTO_ENABLED === 'true') {
        // Placeholder for future ZeptoMail integration; resolve template now
        const tpl = templates[action.templateKey];
        if (tpl) {
          // No-op for now; will add a Zepto publisher later
        }
      }
    }
  }
}

