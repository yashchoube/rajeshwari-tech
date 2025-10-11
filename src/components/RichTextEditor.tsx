'use client';

import { useEffect, useRef, useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Smile, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight, Quote, Code, Palette, Type, Upload, Table, Strikethrough, Subscript, Superscript, Indent, Outdent, Undo, Redo, Save } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const emojis = [
  '😀','😁','😂','😎','😍','🔥','🚀','🎉','✅','⭐','💡','📝','🎯','🌟','💻','📚','🎨','⚡','🎪','📊','🔧','💪','🎭','🌈','📈','💎',
  '👍','👎','👏','🙌','👋','🤝','✌️','🤞','🤟','🤘','👌','🤏','✋','🖐️','🖖','👈','👉','👆','🖕','👇','☝️','👊','✊','🤛','🤜',
  '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','☸️','✡️',
  '🎂','🍰','🧁','🥧','🍕','🍔','🌭','🥪','🌮','🌯','🥙','🧆','🥚','🍳','🥞','🧇','🥓','🥩','🍗','🍖','🦴','🌽','🍅','🍄','🥕','🌶️',
  '⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🎱','🪀','🏓','🏸','🏒','🏑','🥍','🏏','🪃','🥅','⛳','🪁','🏹','🎣','🤿','🥊','🥋','🎽',
  '📱','⌨️','🖥️','🖨️','🖱️','🖲️','💽','💾','💿','📀','📼','📷','📸','📹','🎥','📽️','🎞️','📞','☎️','📟','📠','📺','📻','🎙️'
];

const colors = [
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Gray', value: '#6b7280' },
];

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showColors, setShowColors] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showEmojis && !(event.target as Element).closest('.emoji-picker')) {
        setShowEmojis(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojis]);

  const exec = (command: string, valueArg?: string) => {
    console.log('Executing command:', command, 'with value:', valueArg);
    const result = document.execCommand(command, false, valueArg);
    console.log('Command result:', result);
    if (editorRef.current) {
      console.log('Current editor HTML:', editorRef.current.innerHTML);
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL');
    if (url) exec('createLink', url);
  };

  const insertImage = () => {
    const url = prompt('Enter image URL');
    if (url) exec('insertImage', url);
  };

  const ensureEditorFocus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      // Ensure there's a cursor position
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        const range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(false); // Move to end
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  };

  const onUploadImage = async (file: File) => {
    console.log('onUploadImage called with file:', file.name, file.type, file.size);
    
    if (!file.type.startsWith('image/')) {
      console.log('Invalid file type:', file.type);
      alert('Please select an image file');
      return;
    }
    
    console.log('File validation passed, starting upload...');
    
    // Ensure editor is focused before upload
    ensureEditorFocus();
    
    // Show loading state with unique class for easy identification
    const loadingHtml = `
      <div class="image-upload-loading" style="text-align: center; margin: 20px 0; padding: 40px; background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px; color: #64748b;">
        <div style="font-size: 24px; margin-bottom: 8px;">📤</div>
        <div style="font-weight: 500;">Uploading image...</div>
        <div style="font-size: 12px; margin-top: 4px;">Please wait</div>
      </div>
    `;
    
    exec('insertHTML', loadingHtml);
    
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        console.log('Image upload successful, inserting into editor...');
        console.log('Image URL:', result.url);
        
        // Create image with simple, working controls
        const imgHtml = `
          <div class="image-container" 
               style="
                 position: relative; 
                 display: inline-block; 
                 max-width: 100%;
                 margin: 10px;
                 border: 1px solid #e5e7eb;
                 border-radius: 8px;
                 padding: 8px;
                 background: #fafafa;
               " 
               onmouseenter="this.querySelector('.image-controls').style.display='flex'" 
               onmouseleave="this.querySelector('.image-controls').style.display='none'">
            
            <img 
              src="${result.url}" 
              alt="Uploaded image" 
              style="
                max-width: 100%; 
                height: auto; 
                display: block; 
                border-radius: 4px; 
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                cursor: move;
                transition: transform 0.2s ease;
                user-select: none;
              "
              draggable="true"
              onmousedown="this.style.cursor='grabbing'"
              onmouseup="this.style.cursor='move'"
              onmouseleave="this.style.cursor='move'"
            />
            
            <!-- Image Controls -->
            <div class="image-controls" style="
              position: absolute;
              top: 8px;
              right: 8px;
              display: none;
              gap: 4px;
              z-index: 10;
              background: rgba(0,0,0,0.8);
              padding: 4px;
              border-radius: 6px;
              backdrop-filter: blur(4px);
            ">
              <!-- Position Controls -->
              <button onclick="
                const container = this.closest('.image-container');
                container.style.float = 'left';
                container.style.margin = '10px 15px 10px 0';
                container.style.textAlign = 'left';
              " style="
                background: rgba(34,197,94,0.9);
                color: white;
                border: none;
                border-radius: 4px;
                padding: 6px 8px;
                font-size: 11px;
                cursor: pointer;
                font-weight: bold;
                min-width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
              " title="Align Left">←</button>
              
              <button onclick="
                const container = this.closest('.image-container');
                container.style.float = 'none';
                container.style.margin = '10px auto';
                container.style.textAlign = 'center';
                container.style.display = 'block';
              " style="
                background: rgba(59,130,246,0.9);
                color: white;
                border: none;
                border-radius: 4px;
                padding: 6px 8px;
                font-size: 11px;
                cursor: pointer;
                font-weight: bold;
                min-width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
              " title="Center">⊙</button>
              
              <button onclick="
                const container = this.closest('.image-container');
                container.style.float = 'right';
                container.style.margin = '10px 0 10px 15px';
                container.style.textAlign = 'right';
              " style="
                background: rgba(34,197,94,0.9);
                color: white;
                border: none;
                border-radius: 4px;
                padding: 6px 8px;
                font-size: 11px;
                cursor: pointer;
                font-weight: bold;
                min-width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
              " title="Align Right">→</button>
              
              <!-- Size Controls -->
              <button onclick="
                const img = this.closest('.image-container').querySelector('img');
                const currentWidth = img.offsetWidth;
                const newWidth = Math.min(currentWidth * 1.2, 1200);
                img.style.width = newWidth + 'px';
                img.style.height = 'auto';
                img.style.maxWidth = '100%';
              " style="
                background: rgba(255,255,255,0.9);
                color: #000;
                border: none;
                border-radius: 4px;
                padding: 6px 8px;
                font-size: 11px;
                cursor: pointer;
                font-weight: bold;
                min-width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
              " title="Zoom In">+</button>
              
              <button onclick="
                const img = this.closest('.image-container').querySelector('img');
                const currentWidth = img.offsetWidth;
                const newWidth = Math.max(currentWidth * 0.8, 100);
                img.style.width = newWidth + 'px';
                img.style.height = 'auto';
                img.style.maxWidth = '100%';
              " style="
                background: rgba(255,255,255,0.9);
                color: #000;
                border: none;
                border-radius: 4px;
                padding: 6px 8px;
                font-size: 11px;
                cursor: pointer;
                font-weight: bold;
                min-width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
              " title="Zoom Out">-</button>
              
              <button onclick="
                const img = this.closest('.image-container').querySelector('img');
                img.style.width = '100%';
                img.style.height = 'auto';
                img.style.transform = 'scale(1)';
              " style="
                background: rgba(168,85,247,0.9);
                color: white;
                border: none;
                border-radius: 4px;
                padding: 6px 8px;
                font-size: 11px;
                cursor: pointer;
                font-weight: bold;
                min-width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
              " title="Reset Size">⟲</button>
              
              <button onclick="
                if(confirm('Delete this image?')) {
                  this.closest('.image-container').remove();
                }
              " style="
                background: rgba(220,38,38,0.9);
                color: white;
                border: none;
                border-radius: 4px;
                padding: 6px 8px;
                font-size: 11px;
                cursor: pointer;
                font-weight: bold;
                min-width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
              " title="Delete Image">×</button>
            </div>
          </div>
        `;
        
        console.log('Inserting HTML:', imgHtml);
        
        // Replace the loading HTML with the actual image
        try {
          console.log('Editor ref current:', !!editorRef.current);
          console.log('Editor innerHTML before:', editorRef.current?.innerHTML);
          
          if (editorRef.current) {
            // Find and replace the loading element using class selector
            const loadingElement = editorRef.current.querySelector('.image-upload-loading');
            if (loadingElement) {
              console.log('Found loading element, replacing with image');
              loadingElement.outerHTML = imgHtml;
            } else {
              console.log('Loading element not found, appending image');
              editorRef.current.innerHTML += imgHtml;
            }
            
            // Trigger the onChange callback manually
            onChange(editorRef.current.innerHTML);
            console.log('onChange callback triggered');
            console.log('Editor innerHTML after:', editorRef.current.innerHTML);
          }
          
          console.log('Image insertion completed');
        } catch (error) {
          console.error('Error inserting image:', error);
        }
        
        // Focus back to editor
        if (editorRef.current) {
          editorRef.current.focus();
        }
      } else {
        // Replace loading with error message
        const errorHtml = `
          <div style="text-align: center; margin: 20px 0; padding: 20px; background: #fef2f2; border: 2px solid #fecaca; border-radius: 8px; color: #dc2626;">
            <div style="font-size: 24px; margin-bottom: 8px;">❌</div>
            <div style="font-weight: 500; margin-bottom: 4px;">Upload failed</div>
            <div style="font-size: 12px;">${result.error || 'Unknown error'}</div>
          </div>
        `;
        
        if (editorRef.current) {
          const loadingElement = editorRef.current.querySelector('.image-upload-loading');
          if (loadingElement) {
            loadingElement.outerHTML = errorHtml;
          } else {
            editorRef.current.innerHTML += errorHtml;
          }
          onChange(editorRef.current.innerHTML);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      // Replace loading with error message
      const errorHtml = `
        <div style="text-align: center; margin: 20px 0; padding: 20px; background: #fef2f2; border: 2px solid #fecaca; border-radius: 8px; color: #dc2626;">
          <div style="font-size: 24px; margin-bottom: 8px;">❌</div>
          <div style="font-weight: 500; margin-bottom: 4px;">Upload failed</div>
          <div style="font-size: 12px;">Network error occurred</div>
        </div>
      `;
      
      if (editorRef.current) {
        const loadingElement = editorRef.current.querySelector('.image-upload-loading');
        if (loadingElement) {
          loadingElement.outerHTML = errorHtml;
        } else {
          editorRef.current.innerHTML += errorHtml;
        }
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  const insertEmoji = (emoji: string) => {
    exec('insertText', emoji);
  };

  const applyHeading = (level: 1 | 2) => {
    exec('formatBlock', `H${level}`);
  };

  const applyColor = (color: string) => {
    exec('foreColor', color);
    setShowColors(false);
  };

  const insertQuote = () => {
    exec('formatBlock', 'blockquote');
  };

  const insertCode = () => {
    exec('formatBlock', 'pre');
  };

  const alignText = (alignment: string) => {
    exec('justify' + alignment);
  };

  const insertTable = () => {
    const tableHtml = `
      <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Cell 1</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Cell 2</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Cell 3</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Cell 4</td>
        </tr>
      </table>
    `;
    exec('insertHTML', tableHtml);
  };

  const insertStrikethrough = () => {
    exec('strikeThrough');
  };

  const insertSubscript = () => {
    exec('subscript');
  };

  const insertSuperscript = () => {
    exec('superscript');
  };

  const indentText = () => {
    exec('indent');
  };

  const outdentText = () => {
    exec('outdent');
  };

  const undoAction = () => {
    exec('undo');
  };

  const redoAction = () => {
    exec('redo');
  };

  const insertCodeBlock = () => {
    const codeHtml = `
      <pre style="background: #f4f4f4; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0;">
        <code style="font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.5;">
          // Your code here
          function example() {
            return "Hello World!";
          }
        </code>
      </pre>
    `;
    exec('insertHTML', codeHtml);
  };

  const insertHorizontalRule = () => {
    exec('insertHorizontalRule');
  };

  const insertSpecialChar = (char: string) => {
    exec('insertText', char);
  };

  return (
    <div className="border rounded-lg shadow-sm">
      {/* Enhanced Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 border-b bg-gradient-to-r from-gray-50 to-gray-100">
        {/* Undo/Redo */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={undoAction} title="Undo">
            <Undo className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={redoAction} title="Redo">
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={() => exec('bold')} title="Bold">
            <Bold className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={() => exec('italic')} title="Italic">
            <Italic className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={() => exec('underline')} title="Underline">
            <Underline className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={insertStrikethrough} title="Strikethrough">
            <Strikethrough className="w-4 h-4" />
          </button>
        </div>

        {/* Subscript/Superscript */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={insertSubscript} title="Subscript">
            <Subscript className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={insertSuperscript} title="Superscript">
            <Superscript className="w-4 h-4" />
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={() => applyHeading(1)} title="Heading 1">
            <Heading1 className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={() => applyHeading(2)} title="Heading 2">
            <Heading2 className="w-4 h-4" />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={() => exec('insertUnorderedList')} title="Bulleted list">
            <List className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={() => exec('insertOrderedList')} title="Numbered list">
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={() => alignText('Left')} title="Align Left">
            <AlignLeft className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={() => alignText('Center')} title="Align Center">
            <AlignCenter className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={() => alignText('Right')} title="Align Right">
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        {/* Special Blocks */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={insertQuote} title="Quote">
            <Quote className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={insertCodeBlock} title="Code Block">
            <Code className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={insertHorizontalRule} title="Horizontal Line">
            <Type className="w-4 h-4" />
          </button>
        </div>

        {/* Table */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={insertTable} title="Insert Table">
            <Table className="w-4 h-4" />
          </button>
        </div>

        {/* Indentation */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={indentText} title="Indent">
            <Indent className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={outdentText} title="Outdent">
            <Outdent className="w-4 h-4" />
          </button>
        </div>

        {/* Links and Media */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={insertLink} title="Insert Link">
            <LinkIcon className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" type="button" onClick={insertImage} title="Insert Image URL">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button 
            className="p-2 hover:bg-white rounded-md transition-colors flex items-center gap-1 text-sm font-medium"
            type="button"
            onClick={() => {
              console.log('Upload button clicked');
              if (fileInputRef.current) {
                console.log('File input found, triggering click');
                fileInputRef.current.click();
              } else {
                console.error('File input ref not found');
              }
            }}
            title="Upload Image"
          >
            <Upload className="w-4 h-4" />
            Upload
          </button>
          <button 
            className="p-2 hover:bg-white rounded-md transition-colors text-xs"
            type="button"
            onClick={() => {
              console.log('Test insertHTML button clicked');
              exec('insertHTML', '<p>Test HTML insertion works!</p>');
            }}
            title="Test HTML Insertion"
          >
            Test
          </button>
          <button 
            className="p-2 hover:bg-white rounded-md transition-colors text-xs"
            type="button"
            onClick={() => {
              console.log('Test image insertion clicked');
              if (editorRef.current) {
                editorRef.current.innerHTML += '<img src="/uploads/blogs/5d4c6c9a-f7a0-4b4e-a20b-bb8f116f13bd.png" alt="Test image" style="max-width: 100%; height: auto; display: block; margin: 20px auto;" />';
                onChange(editorRef.current.innerHTML);
              }
            }}
            title="Test Image Insertion"
          >
            TestImg
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              console.log('File input changed:', e.target.files);
              const f = e.target.files?.[0];
              if (f) {
                console.log('File selected:', f.name, f.type, f.size);
                onUploadImage(f);
              } else {
                console.log('No file selected');
              }
              e.currentTarget.value = '';
            }}
          />
        </div>

        {/* Color Picker */}
        <div className="relative">
          <button 
            className="p-2 hover:bg-white rounded-md transition-colors" 
            type="button" 
            onClick={() => setShowColors(!showColors)} 
            title="Text Color"
          >
            <Palette className="w-4 h-4" />
          </button>
          {showColors && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-10">
              <div className="grid grid-cols-4 gap-1">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    className="w-6 h-6 rounded border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.value }}
                    onClick={() => applyColor(color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

                {/* Special Characters */}
                <div className="flex items-center gap-1 border-r pr-2 mr-2">
                  <button 
                    className="p-2 hover:bg-white rounded-md transition-colors" 
                    type="button" 
                    onClick={() => insertSpecialChar('©')} 
                    title="Copyright"
                  >
                    ©
                  </button>
                  <button 
                    className="p-2 hover:bg-white rounded-md transition-colors" 
                    type="button" 
                    onClick={() => insertSpecialChar('®')} 
                    title="Registered"
                  >
                    ®
                  </button>
                  <button 
                    className="p-2 hover:bg-white rounded-md transition-colors" 
                    type="button" 
                    onClick={() => insertSpecialChar('™')} 
                    title="Trademark"
                  >
                    ™
                  </button>
                  <button 
                    className="p-2 hover:bg-white rounded-md transition-colors" 
                    type="button" 
                    onClick={() => insertSpecialChar('€')} 
                    title="Euro"
                  >
                    €
                  </button>
                  <button 
                    className="p-2 hover:bg-white rounded-md transition-colors" 
                    type="button" 
                    onClick={() => insertSpecialChar('£')} 
                    title="Pound"
                  >
                    £
                  </button>
                  <button 
                    className="p-2 hover:bg-white rounded-md transition-colors" 
                    type="button" 
                    onClick={() => insertSpecialChar('¥')} 
                    title="Yen"
                  >
                    ¥
                  </button>
                </div>

                {/* Emojis */}
                <div className="relative">
                  <button 
                    className="p-2 hover:bg-white rounded-md transition-colors" 
                    type="button" 
                    onClick={() => setShowEmojis(!showEmojis)} 
                    title="Emojis"
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                  {showEmojis && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 bg-black bg-opacity-25 z-[9998]"
                        onClick={() => setShowEmojis(false)}
                      />
                      {/* Emoji Picker Modal */}
                      <div className="emoji-picker fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg shadow-2xl p-6 z-[9999] max-w-md max-h-96 overflow-y-auto" style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-semibold text-gray-800">Choose an emoji</span>
                          <button 
                            onClick={() => setShowEmojis(false)}
                            className="text-gray-400 hover:text-gray-600 text-xl p-1 rounded-full hover:bg-gray-100"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="grid grid-cols-12 gap-2 max-h-64 overflow-y-auto">
                          {emojis.map((emoji, index) => (
                            <button
                              key={`emoji-${index}-${emoji}`}
                              type="button"
                              className="text-xl hover:bg-gray-100 rounded-lg p-3 transition-colors hover:scale-110"
                              onClick={() => {
                                insertEmoji(emoji);
                                setShowEmojis(false);
                              }}
                              title={`Insert ${emoji}`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
      </div>
      {/* Enhanced Editor Area */}
      <div
        ref={editorRef}
        className="rich-editor-content min-h-64 max-h-[60vh] overflow-y-auto outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-b-lg"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={() => editorRef.current && onChange(editorRef.current.innerHTML)}
        onKeyDown={(e) => {
          // Keyboard shortcuts
          if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
              case 'b':
                e.preventDefault();
                exec('bold');
                break;
              case 'i':
                e.preventDefault();
                exec('italic');
                break;
              case 'u':
                e.preventDefault();
                exec('underline');
                break;
              case 'z':
                e.preventDefault();
                if (e.shiftKey) {
                  redoAction();
                } else {
                  undoAction();
                }
                break;
              case 'y':
                e.preventDefault();
                redoAction();
                break;
              case 's':
                e.preventDefault();
                // Save functionality can be added here
                break;
            }
          }
        }}
        suppressContentEditableWarning
        style={{
          lineHeight: '1.6',
          fontSize: '16px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
        placeholder="Start writing your blog post here... Use Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline"
      />
      
      {/* Enhanced Styles */}
      <style jsx>{`
        div[contenteditable="true"] {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        div[contenteditable="true"]:empty:before {
          content: attr(placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        /* Code blocks */
        div[contenteditable="true"] pre {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 16px;
          margin: 16px 0;
          overflow-x: auto;
          font-family: 'Courier New', 'Monaco', 'Consolas', monospace;
          font-size: 14px;
          line-height: 1.5;
        }
        
        div[contenteditable="true"] code {
          background: #f1f3f4;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', 'Monaco', 'Consolas', monospace;
          font-size: 13px;
        }
        
        /* Tables */
        div[contenteditable="true"] table {
          border-collapse: collapse;
          width: 100%;
          margin: 16px 0;
          border: 1px solid #ddd;
        }
        
        div[contenteditable="true"] th,
        div[contenteditable="true"] td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        
        div[contenteditable="true"] th {
          background-color: #f8f9fa;
          font-weight: 600;
        }
        
        /* Blockquotes */
        div[contenteditable="true"] blockquote {
          border-left: 4px solid #3b82f6;
          margin: 16px 0;
          padding: 16px 20px;
          background: #f8fafc;
          font-style: italic;
          color: #4b5563;
        }
        
        /* Headings */
        div[contenteditable="true"] h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 24px 0 16px 0;
          color: #1f2937;
        }
        
        div[contenteditable="true"] h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 20px 0 12px 0;
          color: #374151;
        }
        
        /* Lists */
        div[contenteditable="true"] ul,
        div[contenteditable="true"] ol {
          margin: 16px 0;
          padding-left: 24px;
        }
        
        div[contenteditable="true"] li {
          margin: 8px 0;
          line-height: 1.6;
        }
        
        /* Horizontal rule */
        div[contenteditable="true"] hr {
          border: none;
          height: 2px;
          background: linear-gradient(to right, #e5e7eb, #3b82f6, #e5e7eb);
          margin: 24px 0;
        }
        
        /* Images */
        div[contenteditable="true"] img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 16px auto;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        div[contenteditable="true"] img:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        div[contenteditable="true"] .image-container {
          position: relative;
          display: inline-block;
          width: 100%;
          margin: 20px 0;
        }
        
        div[contenteditable="true"] .image-container:hover::after {
          content: "Click to resize • Right-click for options";
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          white-space: nowrap;
          z-index: 10;
        }
        
        div[contenteditable="true"] h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1.5rem 0 1rem 0;
          color: #1f2937;
        }
        
        div[contenteditable="true"] h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1.25rem 0 0.75rem 0;
          color: #374151;
        }
        
        div[contenteditable="true"] blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          background-color: #f8fafc;
          padding: 1rem;
          border-radius: 0 8px 8px 0;
        }
        
        div[contenteditable="true"] pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1rem 0;
          font-family: 'Courier New', monospace;
        }
        
        div[contenteditable="true"] ul, div[contenteditable="true"] ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        div[contenteditable="true"] li {
          margin: 0.5rem 0;
        }
        
        div[contenteditable="true"] a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        div[contenteditable="true"] a:hover {
          color: #1d4ed8;
        }
        
        .image-container {
          text-align: center;
          margin: 16px 0;
          position: relative;
          display: block;
          width: 100%;
        }
        
        .image-container:hover .image-controls {
          display: flex !important;
        }
        
        .image-container:hover .image-info {
          display: block !important;
        }
        
        .image-wrapper {
          position: relative;
          display: inline-block;
          max-width: 100%;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }
        
        .image-wrapper:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        .image-wrapper img {
          max-width: 100%;
          height: auto;
          display: block;
          cursor: move;
          transition: transform 0.2s ease;
        }
        
        .image-wrapper img:hover {
          cursor: grab;
        }
        
        .image-wrapper img:active {
          cursor: grabbing;
        }
        
        .image-controls {
          position: absolute;
          top: 8px;
          right: 8px;
          display: none;
          gap: 4px;
          z-index: 10;
        }
        
        .image-controls button {
          background: rgba(0,0,0,0.7);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 12px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .image-controls button:hover {
          background: rgba(0,0,0,0.9);
        }
        
        .image-controls button:last-child {
          background: rgba(220,38,38,0.8);
        }
        
        .image-controls button:last-child:hover {
          background: rgba(220,38,38,1);
        }
        
        .image-loading {
          text-align: center;
          padding: 40px;
          background: #f8fafc;
          border: 2px dashed #cbd5e1;
          border-radius: 8px;
          color: #64748b;
        }
        
        .image-error {
          text-align: center;
          padding: 20px;
          background: #fef2f2;
          border: 2px solid #fecaca;
          border-radius: 8px;
          color: #dc2626;
        }
        
        .image-info {
          margin-top: 8px;
          font-size: 12px;
          color: #6b7280;
          text-align: center;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .image-container:hover .image-info {
          opacity: 1;
        }
        
      /* Simple Image Controls Styling */
      .image-container {
        position: relative;
        display: inline-block;
        max-width: 100%;
        margin: 10px;
        vertical-align: top;
        transition: all 0.3s ease;
      }
      
      .image-container.float-left {
        float: left;
        margin: 10px 15px 10px 0;
        text-align: left;
      }
      
      .image-container.float-right {
        float: right;
        margin: 10px 0 10px 15px;
        text-align: right;
      }
      
      .image-container.float-center {
        float: none;
        margin: 10px auto;
        text-align: center;
        display: block;
      }
        
        .image-container:hover .image-controls {
          display: flex !important;
        }
        
        .image-controls {
          position: absolute;
          top: 8px;
          right: 8px;
          display: none;
          gap: 4px;
          z-index: 10;
          background: rgba(0,0,0,0.8);
          padding: 4px;
          border-radius: 6px;
          backdrop-filter: blur(4px);
        }
        
        .image-controls button {
          background: rgba(255,255,255,0.9);
          color: #000;
          border: none;
          border-radius: 4px;
          padding: 6px 10px;
          font-size: 12px;
          cursor: pointer;
          font-weight: bold;
          min-width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .image-controls button:hover {
          background: rgba(255,255,255,1);
          transform: scale(1.05);
        }
        
        .image-controls button:last-child {
          background: rgba(220,38,38,0.9);
          color: white;
        }
        
        .image-controls button:last-child:hover {
          background: rgba(220,38,38,1);
        }
        
        .image-controls button:nth-last-child(2) {
          background: rgba(59,130,246,0.9);
          color: white;
        }
        
      .image-controls button:nth-last-child(2):hover {
        background: rgba(59,130,246,1);
      }
      
      /* Editor Content Styling */
      .rich-editor-content {
        min-height: 300px;
        padding: 16px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        outline: none;
        font-family: inherit;
        line-height: 1.6;
        background: white;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      
      .rich-editor-content:empty:before {
        content: "Start typing your content here...";
        color: #9ca3af;
        font-style: italic;
      }
      
      .rich-editor-content h1, .rich-editor-content h2, .rich-editor-content h3 {
        margin: 16px 0 8px 0;
        font-weight: bold;
      }
      
      .rich-editor-content p {
        margin: 8px 0;
      }
    `}</style>
    </div>
  );
}


