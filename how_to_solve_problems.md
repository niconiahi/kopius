# How to solve problems

## Description

In this article I want to teach you _how to think_ of a problem and _how to solve_ such problems. This is a techinique I use to this day and don't think I'll ever stop using. To be honest, I feel it's an essential skill to be able to figure it out by yourself. It's simple, yet effective

## Thinking model

### Expectation

So when you have a problem: where do you start? You will start by thinking what you're expecting your application to do. Let's think about it through an example:

So let's say I have a button in the application and when I click it, nothing happens. When actually I'm expecting it to log "HELLO WORLD" in the console. I'll think clearly: "I'm expecting a log here". That's my expectation. I'll keep it in mind as long I'm fixing the bug

### Where to see in the code

Well, this might seem counter-intuitive at first but it's super simple. If I have a problem with the the "log not showing" I should think: "who is responsible of executing the log?". In the example we are talking, it is the button who's responsible to execute the log, so I'll go there. Let's say the button is this one

```tsx
<button onClick={() => {
  // console.log("HELLO WORLD")
}}>
  Log
</button>
```

Oh, I see the problem now. The log is commented. If the log is commented, so it's the exact opposite of my expectation

### Fixing the bug

By now we know what we are expecting, and we've determined which part of the code correlates to where I'm expecting the log to be happening. The only thing missing now is fixing the bug. For that we'll make the code changes so that the expectation gets fullfiled. In this case, for the expectatation to happen, we should uncomment the commented log, like this

```tsx
<button onClick={() => {
  console.log("HELLO WORLD")
}}>
  Log
</button>
```

And with this, the flow finishes

### Importance

Why this very narrowed example is useful: because it shows off the essential flow of fixing any bug. You first need to know what you're trying to fix, then analyse where that problem is being generated and which code changes are required for the expectation to become true

We'll go over this over, and over, and over again
