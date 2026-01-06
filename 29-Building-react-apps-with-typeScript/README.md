# System Design : Building React Apps with TypeScript

Convert the code below to Typescript.

You are asked to give description on the steps you will do to make the changes ( create a well-commented code)


## Instructions

Code 01 : 

```js
import React from 'react'; 
const Greeting = ({ name }) => { 
return <div>Hello, {name}!</div>;
 };
 export default Greeting;
```
 
Code 02 :
```js
import React, { Component } from 'react'; 
class Counter extends Component { 
state = {
 count: 0
 }; increment = () => {
 this.setState({ count: this.state.count + 1 }); 
}; 
render() { 
return 
( <div> 
<p>Count: {this.state.count}</p> 
<button onClick={this.increment}>Increment</button> 
</div> );
 }
 } 
export default Counter;
```

Steps to Convert to TypeScript
1. Rename the file
Change the file extension from .js to .tsx
(.tsx is required because JSX is used).
2. Define prop types
In TypeScript, props must have explicit types.
3. Create an interface to describe the props.
Type the component
Use React.FC<PropsType> to type the functional component.

Code 01 converted to typescript
```ts
import React from 'react';

/**
 * Step 1: Define an interface for the component props
 * This tells TypeScript that "name" must be a string
 */
interface GreetingProps {
  name: string;
}

/**
 * Step 2: Type the functional component using React.FC
 * React.FC automatically includes children typing if needed
 */
const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

export default Greeting;
```

### Code 02 converted to typescript
```ts
import React, { Component } from 'react';

/**
 * Step 1: Define an interface for props
 * No props are used, so this is an empty interface
 */
interface CounterProps {}

/**
 * Step 2: Define an interface for state
 * "count" must be a number
 */
interface CounterState {
  count: number;
}

/**
 * Step 3: Add generic types to Component
 * Component<CounterProps, CounterState>
 */
class Counter extends Component<CounterProps, CounterState> {

  /**
   * Step 4: Initialize state with correct typing
   */
  state: CounterState = {
    count: 0
  };

  /**
   * Step 5: Arrow function keeps "this" bound correctly
   */
  increment = (): void => {
    this.setState({ count: this.state.count + 1 });
  };

  /**
   * Step 6: render method returns JSX
   */
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
```