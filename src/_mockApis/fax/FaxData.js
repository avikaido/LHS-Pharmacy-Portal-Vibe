import mock from '../mock';
import user1 from 'src/assets/images/profile/user-1.jpg';
import user2 from 'src/assets/images/profile/user-2.jpg';
import user3 from 'src/assets/images/profile/user-3.jpg';
import user4 from 'src/assets/images/profile/user-4.jpg';
import user5 from 'src/assets/images/profile/user-5.jpg';

const FaxData = [
  {
    "id": 1,
    "created_on": "2025-02-21T10:15:30Z",
    "status": "successful",
    "fax": "+15551234567",
    "type": "outgoing",
    "code": "success",
    "doc_link": "https://example.com/faxes/1.pdf",
    "users": 3,
    "patients": 4,
    "requests": 10,
    "deleted": false
  },
  {
    "id": 2,
    "created_on": "2025-02-21T10:20:15Z",
    "status": "failed",
    "fax": "+15557654321",
    "type": "outgoing",
    "code": "busy_signal",
    "doc_link": "https://example.com/faxes/2.pdf",
    "users": 5,
    "patients": 4,
    "requests": null,
    "deleted": false
  },
  {
    "id": 3,
    "created_on": "2025-02-21T10:25:45Z",
    "status": "timeout",
    "fax": "+15559876543",
    "type": "outgoing",
    "code": "no_answer",
    "doc_link": "https://example.com/faxes/3.pdf",
    "users": 2,
    "patients": 4,
    "requests": 15,
    "deleted": false
  },
  {
    "id": 4,
    "created_on": "2025-02-21T10:30:05Z",
    "status": "successful",
    "fax": "+15553456789",
    "type": "incoming",
    "code": "success",
    "doc_link": "https://example.com/faxes/4.pdf",
    "users": 4,
    "patients": 4,
    "requests": 8,
    "deleted": false
  },
  {
    "id": 5,
    "created_on": "2025-02-21T10:35:20Z",
    "status": "failed",
    "fax": "+15551239876",
    "type": "outgoing",
    "code": "invalid_number",
    "doc_link": "https://example.com/faxes/5.pdf",
    "users": 1,
    "patients": 4,
    "requests": 12,
    "deleted": false
  },
  {
    "id": 6,
    "created_on": "2025-02-21T10:40:55Z",
    "status": "successful",
    "fax": "+15556789012",
    "type": "incoming",
    "code": "success",
    "doc_link": "https://example.com/faxes/6.pdf",
    "users": 3,
    "patients": 4,
    "requests": null,
    "deleted": false
  },
  {
    "id": 7,
    "created_on": "2025-02-21T10:45:35Z",
    "status": "timeout",
    "fax": "+15557890123",
    "type": "outgoing",
    "code": "fax_not_answered",
    "doc_link": "https://example.com/faxes/7.pdf",
    "users": 2,
    "patients": 4,
    "requests": 14,
    "deleted": false
  },
  {
    "id": 8,
    "created_on": "2025-02-21T10:50:50Z",
    "status": "failed",
    "fax": "+15553458901",
    "type": "outgoing",
    "code": "paper_jam",
    "doc_link": "https://example.com/faxes/8.pdf",
    "users": 5,
    "patients": 4,
    "requests": 11,
    "deleted": false
  },
  {
    "id": 9,
    "created_on": "2025-02-21T10:55:20Z",
    "status": "successful",
    "fax": "+15555678901",
    "type": "incoming",
    "code": "success",
    "doc_link": "https://example.com/faxes/9.pdf",
    "users": 4,
    "patients": 4,
    "requests": null,
    "deleted": false
  },
  {
    "id": 10,
    "created_on": "2025-02-21T11:00:10Z",
    "status": "failed",
    "fax": "+15552345678",
    "type": "outgoing",
    "code": "network_error",
    "doc_link": "https://example.com/faxes/10.pdf",
    "users": 1,
    "patients": 4,
    "requests": 7,
    "deleted": false
  },
  {
    "id": 11,
    "created_on": "2025-02-21T11:05:30Z",
    "status": "successful",
    "fax": "+15554567890",
    "type": "incoming",
    "code": "success",
    "doc_link": "https://example.com/faxes/11.pdf",
    "users": 2,
    "patients": 4,
    "requests": 9,
    "deleted": false
  },
  {
    "id": 12,
    "created_on": "2025-02-21T11:10:45Z",
    "status": "failed",
    "fax": "+15551239012",
    "type": "outgoing",
    "code": "line_disconnected",
    "doc_link": "https://example.com/faxes/12.pdf",
    "users": 5,
    "patients": 4,
    "requests": null,
    "deleted": false
  },
  {
    "id": 13,
    "created_on": "2025-02-21T11:15:20Z",
    "status": "successful",
    "fax": "+15557890145",
    "type": "incoming",
    "code": "success",
    "doc_link": "https://example.com/faxes/13.pdf",
    "users": 3,
    "patients": 4,
    "requests": 13,
    "deleted": false
  },
  {
    "id": 14,
    "created_on": "2025-02-21T11:20:15Z",
    "status": "timeout",
    "fax": "+15553456712",
    "type": "outgoing",
    "code": "delayed_transmission",
    "doc_link": "https://example.com/faxes/14.pdf",
    "users": 4,
    "patients": 4,
    "requests": 6,
    "deleted": false
  },
  {
    "id": 15,
    "created_on": "2025-02-21T11:25:05Z",
    "status": "successful",
    "fax": "+15551239987",
    "type": "incoming",
    "code": "success",
    "doc_link": "https://example.com/faxes/15.pdf",
    "users": 1,
    "patients": 4,
    "requests": null,
    "deleted": false
  },
  {
    "id": 16,
    "created_on": "2025-02-21T11:30:40Z",
    "status": "failed",
    "fax": "+15554567891",
    "type": "outgoing",
    "code": "unknown_error",
    "doc_link": "https://example.com/faxes/16.pdf",
    "users": 2,
    "patients": 4,
    "requests": 5,
    "deleted": false
  },
  {
    "id": 17,
    "created_on": "2025-02-21T11:35:25Z",
    "status": "successful",
    "fax": "+15555671234",
    "type": "incoming",
    "code": "success",
    "doc_link": "https://example.com/faxes/17.pdf",
    "users": 3,
    "patients": 4,
    "requests": 4,
    "deleted": false
  },
  {
    "id": 18,
    "created_on": "2025-02-21T11:40:15Z",
    "status": "timeout",
    "fax": "+15557890156",
    "type": "outgoing",
    "code": "low_signal_strength",
    "doc_link": "https://example.com/faxes/18.pdf",
    "users": 4,
    "patients": 4,
    "requests": null,
    "deleted": false
  },
  {
    "id": 19,
    "created_on": "2025-02-21T11:45:50Z",
    "status": "failed",
    "fax": "+15552347890",
    "type": "outgoing",
    "code": "device_error",
    "doc_link": "https://example.com/faxes/19.pdf",
    "users": 5,
    "patients": 4,
    "requests": 3,
    "deleted": false
  },
  {
    "id": 20,
    "created_on": "2025-02-21T11:50:30Z",
    "status": "successful",
    "fax": "+15556789023",
    "type": "incoming",
    "code": "success",
    "doc_link": "https://example.com/faxes/20.pdf",
    "users": 1,
    "patients": 4,
    "requests": 2,
    "deleted": false
  }
];

mock.onGet('/api/data/fax/FaxData').reply(() => {
  return [200, FaxData];
});
export default FaxData;
