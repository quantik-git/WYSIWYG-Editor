const editor = document.getElementById('editor');
const toolbar = document.getElementById('toolbar');
const buttons = document.getElementsByClassName('btn');
const visualView = document.getElementById('visual-view');
const htmlView = document.getElementById('html-view');

// enabling resize by default
document.execCommand('enableObjectResizing', false);

// add event listeners
[...buttons].forEach(button => {
    button.addEventListener('click', toolbarClick);
});

visualView.onkeydown =  kbdShortcuts;

function kbdShortcuts(e) {
    let key = e.which || e.keyCode;

    if (key == 9) { // tab handling
        e.preventDefault();
        document.execCommand('insertHTML', false, '&emsp;');
    } else if (e.ctrlKey && key == 66) { // ctrl + b for bold
        e.preventDefault();
        document.execCommand('bold', false);
    } else if (e.ctrlKey && key == 73) { // ctrl + i for italic
        e.preventDefault();
        document.execCommand('italic', false);
    } else if (e.ctrlKey && key == 85) { // ctrl + u for underline
        e.preventDefault();
        document.execCommand('underline', false);
    }
}

function toolbarClick() {
    let action = this.dataset.action;

    switch (action) {
        case 'code':
            execCodeAction(this, editor);
            break;
        case 'codeBlock':
            handleCodeBlock();
            break;
        case 'insertImage':
            handleImage();
            break;
        case 'createLink':
            execPrompt('createLink', 'Link (e.g. https://webdeasy.de/)');
            break;
        case 'heading':
            execPrompt('heading', 'Heading h1-6');
            break;
        default:
            document.execCommand(action, false);
    }
}

function execCodeAction(button) {
    if (button.classList.contains('active')) {
        visualView.innerHTML = htmlView.value;
    } else {
        htmlView.value = visualView.innerHTML;
    }

    visualView.classList.toggle('hidden');
    htmlView.classList.toggle('hidden');
    button.classList.toggle('active');
}

function handleCodeBlock() {
    let template = '<pre><code>code</code></pre>';
    document.execCommand('insertHTML', false, template);
}

function handleImage() {
    let source = prompt("Image link:");
    let template = '<figure><img src="' + source + '"><figcaption>Caption here</figcaption</figure>';
    document.execCommand('insertHTML', false, template);
}

function execPrompt(command, displayString) {
    let value = prompt(displayString);
    document.execCommand(command, false, value);
}