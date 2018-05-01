// Constants.
var ACTIONS = ['left', 'right', 'up', 'down'];
var EPSILON = 0.9;
var ALPHA = 0.1;
var GAMMA = 0.9;
var MAX_EPISODES = 40;
var WAIT = 100;

// Build Q-table function.
function buildQTable() {
    var result = [];
    for (var x = 0; x < TILES; x++) {
        for (var y = 0; y < TILES; y++) {
            var state = { x, y };

            // For every action, add a property with the 
            // action name and set the value to zero.
            for (var j = 0; j < ACTIONS.length; j++) {
                state[ACTIONS[j]] = 0;
            }
            result.push(state);
        }
    }
    return result;
}

// Get state function.
function getState(x, y, qTable) {
    for (var i = 0; i < qTable.length; i++) {
        if (qTable[i].x == x && qTable[i].y == y) {
            return qTable[i];
        }
    }
}

// Get max action from state.
function _getMaxAction(state) {
    // Assume the first action is max.
    var name = ACTIONS[0];
    var value = state[ACTIONS[0]]

    for (var i = 1; i < ACTIONS.length; i++) {
        // Check if any of the actions is "higher" than the
        // current action.
        if (state[ACTIONS[i]] > value) {
            name = ACTIONS[i];
            value = state[ACTIONS[i]];
        }
    }

    return [name, value];
}

// Get max action from state.
function getMaxAction(state) {
    // Get only the name (index).
    return _getMaxAction(state)[0];
}

// Get max action from state.
function getMaxActionValue(state) {
    // Get only the value.
    return _getMaxAction(state)[1];
}

// Check all zero function.
function allZero(state) {
    for (var i = 0; i < ACTIONS.length; i++) {
        if (state[ACTIONS[i]] != 0) {
            return false;
        }
    }
    return true;
}

// Choose action function.
function chooseAction(state, qTable) {
    if (Math.random() > EPSILON || allZero(state)) {
        // Pick random action.
        return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    }
    return getMaxAction(state);
}

// Get environment feedback.
function getEnvFeedback(state, action, qTable) {
    var nextX = state.x;
    var nextY = state.y;
    var reward = 0;

    if (action == 'left') {
        if (state.x > 0) {
            nextX -= 1;
        }
    }
    else if (action == 'right') {
        if (state.x < TILES - 1) {
            nextX += 1;
        }
    }
    else if (action == 'up') {
        if (state.y > 0) {
            nextY -= 1;
        }
    }
    else if (action == 'down') {
        if (state.y < TILES - 1) {
            nextY += 1;
        }
    }

    // Check if the next x and next y is at the treasure.
    if (nextX == POSITIONS.chest.x && nextY == POSITIONS.chest.y) {
        reward = 1;
    }
    else if (nextX == POSITIONS.bomb.x && nextY == POSITIONS.bomb.y) {
        reward = -1;
    }

    // Get the next state.
    var nextState = 'terminal';
    if (reward == 0) {
        nextState = getState(nextX, nextY, qTable);
    }

    return {
        nextState: nextState,
        reward: reward
    };
}

function updateEnv(state) {
    if (state == 'terminal') {
        console.log('Found treasure!');
    }
    else {
        POSITIONS.ship.x = state.x;
        POSITIONS.ship.y = state.y;
    }
}

function startRl() {
    console.log('Creating table...');

    // Create table.
    var qTable = buildQTable();

    // Go through the episodes.
    var episode = 1;

    function run_episode() {
        console.log('Running episode: ' + episode);
        console.table(qTable);

        $('#episode').text('Episode: ' + episode);
        $('#step').text('Step: 0');

        var stepCount = 0;
        var state = getState(0, 0, qTable);
        var terminated = false;

        // Update environment.
        updateEnv(state);

        // Run the step.
        function run_step() {
            if (terminated) {
                $('#history').append('Episode ' + episode +
                    ', Steps: ' + stepCount + '<br/>');
                episode += 1;
                if (episode < MAX_EPISODES) {
                    run_episode();
                }
            }
            else {
                var action = chooseAction(state, qTable);
                var envFeedback = getEnvFeedback(state, action, qTable);

                var qPredict = state[action];
                var qTarget;
                if (envFeedback.nextState != 'terminal') {
                    // Get next state.
                    var nextState = envFeedback.nextState;

                    // Get max.
                    var max = getMaxActionValue(nextState);
                    qTarget = envFeedback.reward + GAMMA * max;
                }
                else {
                    qTarget = envFeedback.reward;
                    terminated = true;
                    POSITIONS.ship.x = 0;
                    POSITIONS.ship.y = 0;
                }

                state[action] += ALPHA * (qTarget - qPredict);
                state = envFeedback.nextState;

                updateEnv(state);
                stepCount += 1;

                $('#steps').text('Step: ' + stepCount);

                // Run step again.
                setTimeout(run_step, WAIT);
            }
        }

        // Start the first step.
        run_step();
    }

    // Run the next episode
    run_episode();
}