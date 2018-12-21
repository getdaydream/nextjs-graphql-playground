// TODO: 与 EventEmitters 以及 通知订阅模式的差别
import { Observable, Subject } from 'rxjs';

// An Observable is a Producer of multiple values, "pushing" them to Observers (Consumers).
// Observables may act like EventEmitters in some cases, namely when they are multicasted using RxJS Subjects, but usually they don't act like EventEmitters.
const observable = Observable.create(observer => {
  // Observable execution 延迟计算
  //  a lazy computation that only happens for each Observer that subscribes

  const intervalID = setInterval(() => {
    observer.next('hi');
  }, 1000);

  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(intervalID);
  };
}) as Observable<number>;

/**
 * When calling observable.subscribe with an Observer,
 * the function subscribe in Observable.create(function subscribe(observer) {...}) is run for that given Observer.
 * Each call to observable.subscribe triggers its own independent setup for that given Observer.
 */
const subscription = observable.subscribe({
  complete: () => console.log('done'),
  next: x => console.log(x),
});

// Later:
subscription.unsubscribe();

// Subject 多播  Observable 单播
// A Subject is like an Observable, but can multicast to many Observers.
// Subjects are like EventEmitters: they maintain a registry of many listeners.
const subject = new Subject<number>();

subject.subscribe({
  next: v => console.log(`observerA: ${v}`),
});
subject.subscribe({
  next: v => console.log(`observerB: ${v}`),
});

subject.next(1);
subject.next(2);
// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
