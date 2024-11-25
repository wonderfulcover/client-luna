<template>
  <div class="p-gradient">
    <span ref="typeText" id="type-text"></span>
    <span class="blinking-cursor">_</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Sleep function
const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

// Typing effect class
class TypeAsync {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  get typeInterval() {
    const randomMs = 100 * Math.random();
    return randomMs < 50 ? 10 : randomMs;
  }

  async type(text: string) {
    for (const character of text) {
      this.element.innerText += character;
      await sleep(this.typeInterval);
    }
  }

  async delete(length: number) {
    for (let i = 0; i < length; i++) {
      this.element.innerText = this.element.innerText.slice(0, -1);
      await sleep(this.typeInterval);
    }
  }
}

// Component logic
const typeText = ref<HTMLElement | null>(null);

onMounted(async () => {
  if (!typeText.value) return;

  const typer = new TypeAsync(typeText.value);

  await sleep(1000);
  typeText.value.innerText = ""; // Clear text initially

  while (true) {
    // Type "Hello, "
    await typer.type("Hello, ");
    // Type "My name is LUNA! How are you?"
    await typer.type("My name is LUNA! How are you?");
    await sleep(2000);
    // Delete all text (length of "Hello, My name is LUNA! How are you?")
    await typer.delete("Hello, My name is LUNA! How are you?".length);

    // Type "I hope you're doing well!"
    await typer.type("I hope you're doing well!");
    await sleep(2000);
    // Delete all text (length of "I hope you're doing well!")
    await typer.delete("I hope you're doing well!".length);
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:40");

body {
  padding: 0 10%;
  background-color: #111;
  color: #FFF;
  font-family: "Open Sans", sans-serif;
  font-size: 2em;
  white-space: nowrap;
}

.blinking-cursor {
  user-select: none;
  animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}
</style>
