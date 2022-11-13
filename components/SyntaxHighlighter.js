import Prism from 'prismjs'
import React, { useState, useEffect } from "react";

const SyntaxHighlighter = ({ children, language }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, [children]);

    return (
        <div>
            <pre>
                <code className={`language-${language}`}>{children}</code>
            </pre>
        </div>
    );

}
export default SyntaxHighlighter;