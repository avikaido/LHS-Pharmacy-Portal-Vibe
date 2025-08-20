// Declarative integration routes per event type.
// Each action has: type ('webhook' | 'email' | 'crmFunction'), destination, payloadBuilder (optional), templateKey (for emails)

export default {
  RequestCreated: [
    {
      type: 'webhook',
      destination: 'zoho_flow',
      // payload already normalized by the emitter; no custom builder needed
    },
    // Example email action (disabled unless ZEPTO_ENABLED=true)
    // { type: 'email', to: 'pharmacist', templateKey: 'request_created_pharmacist' },
  ],

  RequestPhysicianAssigned: [
    { type: 'webhook', destination: 'zoho_flow' },
  ],

  RequestPatientAttached: [
    { type: 'webhook', destination: 'zoho_flow' },
  ],

  RequestPatientCompleted: [
    { type: 'webhook', destination: 'zoho_flow' },
  ],

  RequestCompleted: [
    { type: 'webhook', destination: 'zoho_flow' },
    // { type: 'email', to: 'patient', templateKey: 'request_completed_patient' },
    // { type: 'email', to: 'pharmacist', templateKey: 'request_completed_pharmacist' },
  ],

  PatientCreated: [
    { type: 'webhook', destination: 'zoho_flow' },
  ],

  PhysicianCreated: [
    { type: 'webhook', destination: 'zoho_flow' },
  ],

  PharmacyCreated: [
    { type: 'webhook', destination: 'zoho_flow' },
  ],

  ItemCreated: [
    { type: 'webhook', destination: 'zoho_flow' },
  ],
};


