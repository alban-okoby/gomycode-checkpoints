export default class NotificationService {
  constructor() {
    this.subscribers = [];
  }

  subscribe(user) {
    this.subscribers.push(user);
  }

  notify(message) {
    this.subscribers.forEach(user => user.notify(message));
  }
}
