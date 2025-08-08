// Template registry for email providers (ZeptoMail, etc.)
// You can override per pharmacy id or slug later.

export default {
  request_created_pharmacist: {
    provider: 'zepto',
    templateId: 'tpl_request_created_pharmacist',
    subject: 'New Request Created: {{request.id}}',
  },
  request_completed_pharmacist: {
    provider: 'zepto',
    templateId: 'tpl_request_completed_pharmacist',
    subject: 'Request Completed: {{request.id}}',
  },
  request_completed_patient: {
    provider: 'zepto',
    templateId: 'tpl_request_completed_patient',
    subject: 'Your Prescription Request is Complete',
  },
};


