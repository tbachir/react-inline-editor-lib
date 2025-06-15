import React, { useState, useRef } from 'react';
import { InlineEditor, InlineEditorRef } from '@tbachir/react-inline-editor';
import './App.css';

function App() {
  const [title, setTitle] = useState('Click to Edit This Title');
  const [description, setDescription] = useState('This is a longer description that supports multiple lines. Click to edit and try pressing Enter to create new lines.');
  const [email, setEmail] = useState('user@example.com');
  const [name, setName] = useState('John Doe');
  const [bio, setBio] = useState('');
  
  const editorRef = useRef<InlineEditorRef>(null);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email address';
  };

  const validateRequired = (value: string) => {
    return value.trim().length > 0 ? null : 'This field is required';
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <InlineEditor
            value={title}
            onChange={setTitle}
            placeholder="Enter your title..."
            onEditStart={() => console.log('Started editing title')}
            onEditComplete={(value) => console.log('Completed editing title:', value)}
          />
        </h1>
        
        <div className="examples">
          <section className="example">
            <h2>Basic Text Editing</h2>
            <p>Name: <InlineEditor
              value={name}
              onChange={setName}
              validate={validateRequired}
              placeholder="Enter your name"
            /></p>
          </section>

          <section className="example">
            <h2>Email with Validation</h2>
            <p>Email: <InlineEditor
              value={email}
              onChange={setEmail}
              validate={validateEmail}
              placeholder="Enter your email"
            /></p>
          </section>

          <section className="example">
            <h2>Multiline Description</h2>
            <div className="description-container">
              <InlineEditor
                value={description}
                onChange={setDescription}
                multiline
                maxLength={500}
                placeholder="Enter a description..."
                as="div"
                className="description-editor"
              />
            </div>
          </section>

          <section className="example">
            <h2>Auto-save Bio</h2>
            <div className="bio-container">
              <InlineEditor
                value={bio}
                onChange={setBio}
                multiline
                autoSaveDelay={2000}
                maxLength={200}
                placeholder="Tell us about yourself... (auto-saves after 2 seconds)"
                as="div"
                className="bio-editor"
                onEditComplete={(value) => console.log('Auto-saved bio:', value)}
              />
            </div>
          </section>

          <section className="example">
            <h2>Programmatic Control</h2>
            <p>
              <InlineEditor
                ref={editorRef}
                value="Controlled via ref"
                onChange={() => {}}
                readOnly
              />
            </p>
            <button onClick={() => editorRef.current?.startEditing()}>
              Start Editing
            </button>
          </section>

          <section className="example">
            <h2>Disabled State</h2>
            <p>
              <InlineEditor
                value="This editor is disabled"
                onChange={() => {}}
                disabled
              />
            </p>
          </section>

          <section className="example">
            <h2>Custom Styling</h2>
            <div className="custom-styled">
              <InlineEditor
                value="Custom styled editor"
                onChange={() => {}}
                className="fancy-editor"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: '#2563eb'
                }}
              />
            </div>
          </section>
        </div>

        <footer className="instructions">
          <h3>Instructions:</h3>
          <ul>
            <li>Click any text to start editing</li>
            <li>Press <kbd>Enter</kbd> to save (or <kbd>Ctrl+Enter</kbd> in multiline mode)</li>
            <li>Press <kbd>Escape</kbd> to cancel</li>
            <li>Use <kbd>Ctrl+S</kbd> or <kbd>Cmd+S</kbd> to save</li>
          </ul>
        </footer>
      </header>
    </div>
  );
}

export default App;