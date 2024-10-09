const core = require('@actions/core');

async function run() {
  try {
    // Get the 'name' input defined in the action.yml
    const name = core.getInput('name');
    const message = `Hello, ${name}!`;

    // Print the greeting message
    console.log(message);

    // Set the output message
    core.setOutput('message', message);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
