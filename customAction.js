const core = require('@actions/core');

try {
    const whoToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${whoToGreet}!`);
} catch (error) {
    core.setFailed(error.message);
}