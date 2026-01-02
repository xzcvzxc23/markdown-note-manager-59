const fs = require('fs');
const path = require('path');

const NOTE_DIR = path.join(__dirname, 'notes');

if (!fs.existsSync(NOTE_DIR)) {
  fs.mkdirSync(NOTE_DIR);
  fs.writeFileSync(path.join(NOTE_DIR, 'example.md'), '# Welcome\nThis is your first note.');
}

function listNotes() {
  console.log('--- Markdown Notes ---');
  const files = fs.readdirSync(NOTE_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  if (mdFiles.length === 0) {
    console.log('No notes found.');
    return;
  }

  mdFiles.forEach(file => {
    const content = fs.readFileSync(path.join(NOTE_DIR, file), 'utf8');
    const title = content.split('\n')[0].replace('# ', '').trim();
    console.log(`[${file}] - Title: ${title}`);
  });
}

function addNote(filename, content) {
  const filePath = path.join(NOTE_DIR, filename.endsWith('.md') ? filename : `${filename}.md`);
  fs.writeFileSync(filePath, content);
  console.log(`Note "${filename}" saved successfully.`);
}

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (command) {
  case 'list':
    listNotes();
    break;
  case 'add':
    if (arg1 && arg2) {
      addNote(arg1, arg2);
    } else {
      console.log('Usage: node note-manager.js add <filename> <content>');
    }
    break;
  default:
    console.log('Available commands: list, add');
}