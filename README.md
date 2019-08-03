# vue-amount-chooser

![vue-amount-chooser](https://i.imgur.com/3VVusQC.png)

# Installation
`npm i vue-amount-chooser`

```vue
<template>
   <div style="margin: auto; width: 40%; height: 40px;">
      <amount-chooser v-model="value" :settings="settings" />
   </div>
</template>

<script>
import AmountChooser from 'vue-amount-chooser';

export default {
  data() {
    return {
      value: 100,
      settings: {
        max: 100,
      }
    }
  },
  components: {
        'amount-chooser': AmountChooser,
    },
}
</script>
```

# Props

settings:
```js
{
  min: 1, // minimum value
  max: Number.MAX_SAFE_INTEGER, // maximum value
  classes: { // additional classes for each element for custom styling
    'main': '',
    'main__input-block': '',
    'main__input': '',
    'main__button': '',
    'main__button_left': '',
    'main__button_right': '',
  },
  buttons: { // buttons settings
    left: {
      amount: -1,
      text: '-',
    },
    right: {
      amount: 1,
        text: '+',
    },
   },
}
```
