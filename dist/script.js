const editor = document.getElementById('editor');
const toolbar = document.getElementById('toolbar');
const buttons = document.getElementsByClassName('btn');

for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];

    button.addEventListener('click', function (e) {
        let action = this.dataset.action;

        switch (action) {
            case 'code':
                execCodeAction(this, editor);
                break;
            case 'createLink':
                execPrompt('createLink', 'Link (e.g. https://webdeasy.de/)');
                break;
            case 'heading':
                execPrompt('heading', 'Heading h1-6');
                break;
            case 'insertImage':
                execPrompt('insertImage', 'https://via.placeholder.com/150');
                break;
            default:
                document.execCommand(action, false);
        }
    });
}

//run enableObjectResizing by default

function execCodeAction(button, editor) {
    const visuellView = document.getElementById('visuell-view');
    const htmlView = document.getElementById('html-view');

    if (button.classList.contains('active')) {
        visuellView.innerHTML = htmlView.value;
    } else {
        htmlView.value = visuellView.innerHTML;
    }

    visuellView.classList.toggle('hidden');
    htmlView.classList.toggle('hidden');
    button.classList.toggle('active');
}

function execPrompt(command, displayString) {
    let value = prompt(displayString);
    document.execCommand(command, false, value);
}