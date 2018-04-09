const url = "http://new.whoer.net/stream";
const stream = new EventSource(url, { withCredentials: true });

export default stream;
