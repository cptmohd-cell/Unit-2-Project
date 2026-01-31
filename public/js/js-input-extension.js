/**
 * JavaScript Input Extension - Enhanced Input Display with Syntax Highlighting
 * Provides beautiful JavaScript input handling with syntax highlighting, validation, and formatting
 */

class JSInputExtension {
    constructor(options = {}) {
        this.options = {
            theme: options.theme || 'dark',
            lineNumbers: options.lineNumbers !== false,
            autoFormat: options.autoFormat !== false,
            validateSyntax: options.validateSyntax !== false,
            ...options
        };
        this.init();
    }

    init() {
        this.createStyles();
        this.setupEventListeners();
    }

    createStyles() {
        const styleId = 'js-input-extension-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .js-input-container {
                position: relative;
                font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                background: ${this.options.theme === 'dark' ? '#1e1e1e' : '#ffffff'};
                border: 2px solid ${this.options.theme === 'dark' ? '#404040' : '#d1d5db'};
                border-radius: 8px;
                overflow: hidden;
                margin: 10px 0;
            }

            .js-input-header {
                background: ${this.options.theme === 'dark' ? '#2d2d2d' : '#f3f4f6'};
                padding: 8px 12px;
                border-bottom: 1px solid ${this.options.theme === 'dark' ? '#404040' : '#e5e7eb'};
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .js-input-title {
                font-size: 12px;
                font-weight: 600;
                color: ${this.options.theme === 'dark' ? '#ffffff' : '#374151'};
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .js-input-controls {
                display: flex;
                gap: 8px;
            }

            .js-input-btn {
                background: ${this.options.theme === 'dark' ? '#404040' : '#e5e7eb'};
                border: none;
                color: ${this.options.theme === 'dark' ? '#ffffff' : '#374151'};
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 11px;
                cursor: pointer;
                transition: all 0.2s;
            }

            .js-input-btn:hover {
                background: ${this.options.theme === 'dark' ? '#505050' : '#d1d5db'};
            }

            .js-input-wrapper {
                display: flex;
                min-height: 200px;
            }

            .js-line-numbers {
                background: ${this.options.theme === 'dark' ? '#252526' : '#f9fafb'};
                color: ${this.options.theme === 'dark' ? '#858585' : '#9ca3af'};
                padding: 12px 8px;
                text-align: right;
                user-select: none;
                font-size: 14px;
                line-height: 1.5;
                border-right: 1px solid ${this.options.theme === 'dark' ? '#404040' : '#e5e7eb'};
            }

            .js-input-textarea {
                flex: 1;
                background: transparent;
                border: none;
                outline: none;
                color: ${this.options.theme === 'dark' ? '#ffffff' : '#1f2937'};
                padding: 12px;
                font-family: inherit;
                font-size: 14px;
                line-height: 1.5;
                resize: vertical;
                min-height: 200px;
            }

            .js-input-preview {
                flex: 1;
                padding: 12px;
                background: ${this.options.theme === 'dark' ? '#1e1e1e' : '#ffffff'};
                color: ${this.options.theme === 'dark' ? '#ffffff' : '#1f2937'};
                font-family: inherit;
                font-size: 14px;
                line-height: 1.5;
                overflow: auto;
                white-space: pre-wrap;
                word-wrap: break-word;
            }

            .js-input-status {
                padding: 8px 12px;
                border-top: 1px solid ${this.options.theme === 'dark' ? '#404040' : '#e5e7eb'};
                font-size: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .status-valid {
                color: #10b981;
            }

            .status-invalid {
                color: #ef4444;
            }

            .status-warning {
                color: #f59e0b;
            }

            .syntax-keyword { color: #569cd6; font-weight: bold; }
            .syntax-string { color: #ce9178; }
            .syntax-number { color: #b5cea8; }
            .syntax-comment { color: #6a9955; font-style: italic; }
            .syntax-function { color: #dcdcaa; }
            .syntax-operator { color: #d4d4d4; }
            .syntax-parenthesis { color: #ffd700; }
            .syntax-bracket { color: #ff8c00; }
            .syntax-brace { color: #ff6347; }
            .syntax-variable { color: #9cdcfe; }
            .syntax-error { background: rgba(239, 68, 68, 0.2); border-bottom: 2px dotted #ef4444; }

            @media (max-width: 768px) {
                .js-input-wrapper {
                    flex-direction: column;
                }
                
                .js-line-numbers {
                    border-right: none;
                    border-bottom: 1px solid ${this.options.theme === 'dark' ? '#404040' : '#e5e7eb'};
                    text-align: left;
                    padding: 8px 12px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('js-input-textarea')) {
                this.handleInput(e.target);
            }
        });
    }

    createInput(container, options = {}) {
        const config = { ...this.options, ...options };
        const wrapper = document.createElement('div');
        wrapper.className = 'js-input-container';
        
        const header = this.createHeader(config);
        const inputWrapper = this.createInputWrapper(config);
        const status = this.createStatus();
        
        wrapper.appendChild(header);
        wrapper.appendChild(inputWrapper);
        wrapper.appendChild(status);
        
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (container) {
            container.appendChild(wrapper);
        }
        
        return wrapper;
    }

    createHeader(config) {
        const header = document.createElement('div');
        header.className = 'js-input-header';
        
        const title = document.createElement('div');
        title.className = 'js-input-title';
        title.textContent = config.title || 'JavaScript Input';
        
        const controls = document.createElement('div');
        controls.className = 'js-input-controls';
        
        if (config.autoFormat) {
            const formatBtn = document.createElement('button');
            formatBtn.className = 'js-input-btn';
            formatBtn.textContent = 'Format';
            formatBtn.onclick = () => this.formatCode(header.parentElement);
            controls.appendChild(formatBtn);
        }
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'js-input-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.onclick = () => this.copyCode(header.parentElement);
        controls.appendChild(copyBtn);
        
        const clearBtn = document.createElement('button');
        clearBtn.className = 'js-input-btn';
        clearBtn.textContent = 'Clear';
        clearBtn.onclick = () => this.clearCode(header.parentElement);
        controls.appendChild(clearBtn);
        
        header.appendChild(title);
        header.appendChild(controls);
        
        return header;
    }

    createInputWrapper(config) {
        const wrapper = document.createElement('div');
        wrapper.className = 'js-input-wrapper';
        
        if (config.lineNumbers) {
            const lineNumbers = document.createElement('div');
            lineNumbers.className = 'js-line-numbers';
            lineNumbers.textContent = '1';
            wrapper.appendChild(lineNumbers);
        }
        
        const textarea = document.createElement('textarea');
        textarea.className = 'js-input-textarea';
        textarea.placeholder = 'Enter your JavaScript code here...';
        textarea.spellcheck = false;
        
        const preview = document.createElement('div');
        preview.className = 'js-input-preview';
        preview.style.display = 'none';
        
        wrapper.appendChild(textarea);
        wrapper.appendChild(preview);
        
        return wrapper;
    }

    createStatus() {
        const status = document.createElement('div');
        status.className = 'js-input-status';
        
        const message = document.createElement('div');
        message.className = 'status-message';
        message.textContent = 'Ready';
        
        const info = document.createElement('div');
        info.className = 'status-info';
        info.textContent = '0 lines, 0 characters';
        
        status.appendChild(message);
        status.appendChild(info);
        
        return status;
    }

    handleInput(textarea) {
        const container = textarea.closest('.js-input-container');
        if (!container) return;
        
        const code = textarea.value;
        const lineNumbers = container.querySelector('.js-line-numbers');
        const preview = container.querySelector('.js-input-preview');
        const status = container.querySelector('.js-input-status');
        
        // Update line numbers
        if (lineNumbers) {
            const lines = code.split('\n').length;
            lineNumbers.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('<br>');
        }
        
        // Update preview with syntax highlighting
        if (preview) {
            preview.innerHTML = this.highlightSyntax(code);
        }
        
        // Update status
        this.updateStatus(status, code);
        
        // Validate syntax if enabled
        if (this.options.validateSyntax) {
            this.validateSyntax(code, status);
        }
    }

    highlightSyntax(code) {
        if (!code) return '';
        
        let highlighted = code
            .replace(/\b(function|const|let|var|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|this|typeof|instanceof|in|of|class|extends|import|export|from|default|async|await|yield|debugger)\b/g, 
                '<span class="syntax-keyword">$1</span>')
            .replace(/(['"])(?:(?=(\\?))\2.)*?\1/g, '<span class="syntax-string">$&</span>')
            .replace(/\b\d+\.?\d*\b/g, '<span class="syntax-number">$&</span>')
            .replace(/\/\/.*$/gm, '<span class="syntax-comment">$&</span>')
            .replace(/\/\*[\s\S]*?\*\//g, '<span class="syntax-comment">$&</span>')
            .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="syntax-function">$1</span>(')
            .replace(/([+\-*\/=<>!&|])/g, '<span class="syntax-operator">$1</span>')
            .replace(/\(/g, '<span class="syntax-parenthesis">(</span>')
            .replace(/\)/g, '<span class="syntax-parenthesis">)</span>')
            .replace(/\[/g, '<span class="syntax-bracket">[</span>')
            .replace(/\]/g, '<span class="syntax-bracket">]</span>')
            .replace(/\{/g, '<span class="syntax-brace">{</span>')
            .replace(/\}/g, '<span class="syntax-brace">}</span>');
        
        return highlighted;
    }

    validateSyntax(code, statusElement) {
        try {
            new Function(code);
            this.updateStatusMessage(statusElement, 'Syntax valid', 'valid');
        } catch (error) {
            this.updateStatusMessage(statusElement, `Syntax error: ${error.message}`, 'invalid');
        }
    }

    updateStatus(statusElement, code) {
        const lines = code.split('\n').length;
        const characters = code.length;
        const info = statusElement.querySelector('.status-info');
        if (info) {
            info.textContent = `${lines} lines, ${characters} characters`;
        }
    }

    updateStatusMessage(statusElement, message, type) {
        const messageElement = statusElement.querySelector('.status-message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `status-message status-${type}`;
        }
    }

    formatCode(container) {
        const textarea = container.querySelector('.js-input-textarea');
        if (!textarea) return;
        
        try {
            // Simple formatting - can be enhanced with prettier integration
            let code = textarea.value;
            code = code.replace(/;/g, ';\n');
            code = code.replace(/\{/g, ' {\n  ');
            code = code.replace(/\}/g, '\n}');
            code = code.replace(/\n\s*\n/g, '\n');
            
            textarea.value = code.trim();
            this.handleInput(textarea);
        } catch (error) {
            console.error('Formatting error:', error);
        }
    }

    copyCode(container) {
        const textarea = container.querySelector('.js-input-textarea');
        if (!textarea) return;
        
        textarea.select();
        document.execCommand('copy');
        
        const status = container.querySelector('.js-input-status');
        this.updateStatusMessage(status, 'Code copied to clipboard!', 'valid');
        
        setTimeout(() => {
            this.updateStatusMessage(status, 'Ready', 'valid');
        }, 2000);
    }

    clearCode(container) {
        const textarea = container.querySelector('.js-input-textarea');
        if (!textarea) return;
        
        textarea.value = '';
        this.handleInput(textarea);
        
        const status = container.querySelector('.js-input-status');
        this.updateStatusMessage(status, 'Cleared', 'valid');
    }

    // Static method to initialize all inputs with data-js-input attribute
    static initializeAll() {
        document.querySelectorAll('[data-js-input]').forEach(element => {
            const options = JSON.parse(element.getAttribute('data-js-input') || '{}');
            new JSInputExtension().createInput(element, options);
        });
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    JSInputExtension.initializeAll();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JSInputExtension;
}

// Global assignment for browser
window.JSInputExtension = JSInputExtension;
