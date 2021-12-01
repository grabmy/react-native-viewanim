# React-native-viewanim

Animated view in React native without reanimated.

Animate the change of position, rotation, scale, opacity
and background color of a view element with an easing feature.

## Installation

```
npm install --save react-native-viewanim
```

## Usage

First you have to import the ViewAnim component:

```js
import ViewAnim from "react-native-viewanim";
```

Then place the ViewAnim component where you want and provide the property "from" and "to" of the animation:

```js
  <ViewAnim from={x:0} to={x: 100} duration={1000}><Text>Just a text</Text></ViewAnim>
```

The full script of an exemple:

```js
import React from 'react';
import { Text } from 'react-native';
import ViewAnim from 'react-native-viewanim';

const HelloWorldApp = () => {
  return (
    <ViewAnim
      from={x:0, rotate: 0}
      to={x: 100, rotate: 360}
      duration={2000}
      repeat={10}>
      <Text>This is animated</Text>
    </ViewAnim>
  )
}
export default HelloWorldApp;
```

## Properties

| Property           | Description                                                                                                                       | Default                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **`from`**         | Object that contains the set of values at the start of the animation. Values can be x, y, rotate, scale, opacity, backgroundColor | _Null_                        |
| **`to`**           | Object that contains the set of values at the end of the animation. Values can be x, y, rotate, scale, opacity, backgroundColor   | _Null_                        |
| **`duration`**     | For how long the animation will run (milliseconds).                                                                               | `1000`                        |
| **`delay`**        | Optionally delay animation (milliseconds).                                                                                        | `0`                           |
| **`repeat`**       | The number of time the animation repeat, -1 is forever.                                                                           | `1`                           |
| **`easing`**       | Timing function for the animation. Custom function or one of the Easing function provided in ViewAnim.Easing                      | `ViewAnim.Easing.Linear.None` |
| **`style`**        | Style added to the view                                                                                                           | _Null_                        |
| **`cycle`**        | If true, animation loop from end values to start values                                                                           | `false`                       |
| **`trigger`**      | Switch this boolean to true or false to trigger the naimation                                                                     | `false`                       |
| **`toggle`**       | Set to trigger on start with `start` or on trigger with `trigger`                                                                 | `start`                       |
| **`resetOnStart`** | Reset values to start values when animation start                                                                                 | `true`                        |
| **`resetOnStart`** | Reset values to start values when animation start                                                                                 | `true`                        |
| **`frameDelay`**   | Time between updates in ms                                                                                                        | `16`                          |

## Easing functions:

- `ViewAnim.Easing.Linear.None`
- `ViewAnim.Easing.Quadratic.In`, `ViewAnim.Easing.Quadratic.Out`, ` ViewAnim.Easing.Quadratic.InOut`
- ` ViewAnim.Easing.Cubic.In`, `ViewAnim.Easing.Cubic.Out`, `ViewAnim.Easing.Cubic.InOut`
- `ViewAnim.Easing.Quadric.In`, `ViewAnim.Easing.Quadric.Out`, `ViewAnim.Easing.Quadric.InOut`
- `ViewAnim.Easing.Quintic.In`, `ViewAnim.Easing.Quintic.Out`, `ViewAnim.Easing.Quintic.InOut`
- ` ViewAnim.Easing.Sinusoidal.In`, `ViewAnim.Easing.Sinusoidal.Out`, `ViewAnim.Easing.Sinusoidal.InOut`
- ` ViewAnim.Easing.Exponential.In`, `ViewAnim.Easing.Exponential.Out`, `ViewAnim.Easing.Exponential.InOut`
- `ViewAnim.Easing.Circular.In`, `ViewAnim.Easing.Circular.Out`, `ViewAnim.Easing.Circular.InOut`
- ` ViewAnim.Easing.Elastic.In`, `ViewAnim.Easing.Elastic.Out`, `ViewAnim.Easing.Elastic.InOut`
- `ViewAnim.Easing.Back.In`, `ViewAnim.Easing.Back.Out`, `ViewAnim.Easing.Back.InOut`
- `ViewAnim.Easing.Bounce.In`, `ViewAnim.Easing.Bounce.Out`, `ViewAnim.Easing.Bounce.InOut`
- `ViewAnim.Easing.Vibrate.Once`, `ViewAnim.Easing.Vibrate.Repeat2`, `ViewAnim.Easing.Vibrate.Repeat3`, `ViewAnim.Easing.Vibrate.Repeat4`, `ViewAnim.Easing.Vibrate.Repeat5`, `ViewAnim.Easing.Vibrate.Repeat10`, `ViewAnim.Easing.Vibrate.Repeat15`, `ViewAnim.Easing.Vibrate.Repeat20`, `ViewAnim.Easing.Vibrate.Repeat30`

## Changelog

### Version 0.2.0

- Do not call stop when animation is not playing
- When toggle = true animate from start to end, toggle = false animate from end to start
- if initial property toggle = true, launch animation at start
- Update to simple tween 0.3.2

## TODO

- Change property modification detection
- Add live modification of the viewanim properties
- Add preset animations
- make trigger an enum type "start" / "toggle"
- Add trigger type "none" to use only
- Chain animations
- Add examples with executables app files
- write tests
  - basic example trigger = start
  - basic example trigger = toggle
  - launch animation at start if toggle = true
  - pause / resume
  - cycle
  - change to property
- Add smooth property to soften animation
