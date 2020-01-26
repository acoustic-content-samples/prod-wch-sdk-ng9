export function isProgressEvent(object: any): object is ProgressEvent {
  return object instanceof ProgressEvent;
}

export function isResponseEvent(object: any) {
  return !isProgressEvent(object);
}
