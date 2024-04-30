import { useState, useRef } from "react";
import { IoCode } from "react-icons/io5";
import { RiSuperscript } from "react-icons/ri";
import { LuSubscript } from "react-icons/lu";
import { ImQuotesLeft } from "react-icons/im";
import {
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaAlignJustify,
  FaCloudUploadAlt,
  FaEraser,
} from "react-icons/fa";
import { IoMdColorWand, IoIosColorPalette } from "react-icons/io";
import { SketchPicker } from "react-color";
import { MdBorderColor } from "react-icons/md";
import { FaTableCells } from "react-icons/fa6";

const TextEditor = () => {
  // variables
  const [selectedStyles, setSelectedStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    superscript: false,
    subscript: false,
    quote: false,
    code: false,
  });

  const editorRef = useRef(null);
  const [quoteClicked, setQuoteClicked] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedBackgroundColor] = useState("#ffffff");
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFontSize, setSelectedFontSize] = useState("normal");
  const [isCodeClicked, setIsCodeClicked] = useState(false);
  const [showTableDialog, setShowTableDialog] = useState(false);
  const [numRows, setNumRows] = useState(2);
  const [numCols, setNumCols] = useState(2);

  const toggleStyles = (style) => {
    if (style === "code") {
      setIsCodeClicked(!isCodeClicked);
    } else {
      document.execCommand(style, false, null);
    }
    updateSelectedStyles();
  };

  const updateSelectedStyles = () => {
    setSelectedStyles({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      superscript: document.queryCommandState("superscript"),
      subscript: document.queryCommandState("subscript"),
      quote: document.queryCommandState("quote"),
      code: document.queryCommandState("code"),
    });
  };

  const handleInlineStyle = (style) =>
    selectedStyles[style] ? "bg-green-500 text-black" : "";

  // quote
  const handleQuoteClick1 = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const newNode = document.createElement("div");

    newNode.style.backgroundColor = "#DBE9FF";
    newNode.style.width = "100%";
    newNode.style.display = "block";
    newNode.style.borderLeft = "5px solid #448AFF";
    newNode.style.paddingLeft = "10px";
    newNode.style.paddingTop = "15px";
    newNode.style.paddingBottom = "15px";

    if (selectedText) {
      newNode.innerHTML = selectedText;
      selection.getRangeAt(0).surroundContents(newNode);
    } else {
      newNode.innerHTML = "<br>";
      editorRef.current.appendChild(newNode);
    }

    setQuoteClicked(true);
  };

  const handleQuoteClick2 = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const newNode = document.createElement("div");

    newNode.style.backgroundColor = "#FFEACE";
    newNode.style.width = "100%";
    newNode.style.display = "block";
    newNode.style.borderLeft = "5px solid #FF9100";
    newNode.style.paddingLeft = "10px";
    newNode.style.paddingTop = "15px";
    newNode.style.paddingBottom = "15px";

    if (selectedText) {
      newNode.innerHTML = selectedText;
      selection.getRangeAt(0).surroundContents(newNode);
    } else {
      newNode.innerHTML = "<br>";
      editorRef.current.appendChild(newNode);
    }

    setQuoteClicked(true);
  };

  const handleQuoteClick3 = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    const newNode = document.createElement("div");
    newNode.style.backgroundColor = "#F6ECF8";
    newNode.style.width = "100%";
    newNode.style.display = "block";
    newNode.style.borderLeft = "5px solid #AB47BC";
    newNode.style.paddingLeft = "10px";
    newNode.style.paddingTop = "15px";
    newNode.style.paddingBottom = "15px";

    if (selectedText) {
      newNode.innerHTML = selectedText;
      selection.getRangeAt(0).surroundContents(newNode);
    } else {
      newNode.innerHTML = "<br>";
      editorRef.current.appendChild(newNode);
    }

    setQuoteClicked(true);
  };

  const handleQuoteClick4 = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const newNode = document.createElement("div");
    newNode.style.backgroundColor = "#F5F5F5";
    newNode.style.width = "100%";
    newNode.style.display = "#C2C2C2";
    newNode.style.borderLeft = "5px solid #EDEDED";
    newNode.style.paddingLeft = "10px";
    newNode.style.paddingTop = "15px";
    newNode.style.paddingBottom = "15px";

    if (selectedText) {
      newNode.innerHTML = selectedText;
      selection.getRangeAt(0).surroundContents(newNode);
    } else {
      newNode.innerHTML = "<br>";
      editorRef.current.appendChild(newNode);
    }

    setQuoteClicked(true);
  };

  // code
  const handleCode = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const codeSnippet = `
      <aside class="bg-black text-white p-6 rounded-lg w-full max-w-full font-mono">
        <div class="flex justify-between items-center">
          <div class="flex space-x-2 text-red-500">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p class="text-sm">bash</p>
        </div>
        <div class="mt-4">
          <p class="text-green-400">$ ${selectedText}</p>
          <p class="text-green-400">$</p>
        </div>
      </aside>
    `;

      const range = selection.getRangeAt(0);
      const codeNode = document.createElement("div");
      codeNode.innerHTML = codeSnippet;
      range.deleteContents();
      range.insertNode(codeNode);
    }
  };

  // unordered list
  const handleUnorderList = (style) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const range = selection.getRangeAt(0);

    const ul = document.createElement("ul");
    ul.style.listStyleType = style;
    ul.style.marginLeft = "20px";

    const lines = selectedText.split("\n");

    lines.forEach((line, index) => {
      const li = document.createElement("li");
      li.textContent = line;
      ul.appendChild(li);
    });

    range.deleteContents();
    range.insertNode(ul);

    setSelectedStyles({ ...selectedStyles, unorderedList: style });
  };

  // ordered list
  const handleOrderedList = (style) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const range = selection.getRangeAt(0);

    const ol = document.createElement("ol");

    switch (style) {
      case "1":
        ol.style.listStyleType = "decimal";
        break;
      case "i":
        ol.style.listStyleType = "upper-roman";
        break;
      case "I":
        ol.style.listStyleType = "lower-roman";
        break;
      case "A":
        ol.style.listStyleType = "upper-alpha";
        break;
      case "a":
        ol.style.listStyleType = "lower-alpha";
        break;
      default:
        ol.style.listStyleType = "decimal";
    }

    ol.style.marginLeft = "20px";

    const lines = selectedText.split("\n");

    lines.forEach((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      ol.appendChild(li);
    });

    range.deleteContents();
    range.insertNode(ol);

    setSelectedStyles({ ...selectedStyles, orderedList: style });
  };

  // text area
  const handleTextInput = (e) => {
    if (quoteClicked) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setQuoteClicked(false);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const textNode = document.createTextNode("\u00A0\u00A0");
      range.insertNode(textNode);
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
    }
  };

  // text alignment
  const handleAlignment = (alignment) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      const range = selection.getRangeAt(0);
      const alignedContainer = document.createElement("div");

      switch (alignment) {
        case "left":
          alignedContainer.style.textAlign = "left";
          break;
        case "center":
          alignedContainer.style.textAlign = "center";
          break;
        case "right":
          alignedContainer.style.textAlign = "right";
          break;
        case "justify":
          alignedContainer.style.textAlign = "justify";
          break;
        default:
          alignedContainer.style.textAlign = "left";
      }

      alignedContainer.appendChild(range.extractContents());
      range.insertNode(alignedContainer);
    } else {
      const clickedLine = selection.anchorNode.parentNode;
      if (clickedLine) {
        switch (alignment) {
          case "left":
            clickedLine.style.textAlign = "left";
            break;
          case "center":
            clickedLine.style.textAlign = "center";
            break;
          case "right":
            clickedLine.style.textAlign = "right";
            break;
          case "justify":
            clickedLine.style.textAlign = "justify";
            break;
          default:
            clickedLine.style.textAlign = "left";
        }
      }
    }
  };

  // Text color
  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color) => {
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.color = color.hex;
      range.surroundContents(span);
      setShowColorPicker(true);
    }
  };

  // background color
  const handleBackgroundColorChange = (color) => {
    document.execCommand("backColor", false, color.hex);
  };

  // Highlight text
  const handleHighlight = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const span = document.createElement("span");
    span.style.backgroundColor = "yellow";
    span.textContent = selectedText;
    range.deleteContents();
    range.insertNode(span);
  };

  // upload image
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // font size
  const handleFontSizeChange = (e) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const fontSize = e.target.value;

    console.log("Selected font size:", fontSize);

    if (!selection.isCollapsed) {
      const span = document.createElement("span");
      span.style.fontSize = fontSize;
      range.surroundContents(span);
    } else {
      const span = document.createElement("span");
      span.style.fontSize = fontSize;
      span.appendChild(document.createTextNode("\u200b"));
      range.insertNode(span);
      range.setStartAfter(span);
      range.setEndAfter(span);
    }

    setSelectedFontSize(fontSize);
  };

  // font family
  const handleFontFamily = (e) => {
    if (quoteClicked) {
      e.preventDefault();
    } else {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      const fontFamily = e.target.value;

      if (selectedText && fontFamily) {
        const span = document.createElement("span");
        span.style.fontFamily = fontFamily;
        range.surroundContents(span);
      }
    }
  };

  // eraser
  const handleEraser = () => {
    document.execCommand("removeFormat");
    setSelectedStyles({
      bold: false,
      italic: false,
      underline: false,
      superscript: false,
      subscript: false,
      quote: false,
      code: false,
    });
    document.execCommand("backColor", false, "transparent");
    document.execCommand("foreColor", false, "black");
    setSelectedFontSize("normal");
  };

  // paste text style remove
  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.originalEvent || e).clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  // table
  const insertTable = () => {
    const tableHTML = `
      <table border="1" cellpadding="5" cellspacing="0">
        <tbody>
          ${Array.from(
            { length: numRows },
            () => `
            <tr>
              ${Array.from(
                { length: numCols },
                () => `
                <td>&nbsp;</td>
              `
              ).join("")}
            </tr>
          `
          ).join("")}
        </tbody>
      </table>
    `;
    document.execCommand("insertHTML", false, tableHTML);
    setShowTableDialog(false);
  };

  return (
    <main>
      <div className="container mx-auto mt-10">
        <div className="flex flex-col gap-4">
          <div className="toolbar">
            <section className="grid grid-cols-4 md:grid-cols-10 justify-start items-center gap-5 mx-5 md:mx-10">
              {/* Bold Italic Underline Subscript Superscript */}
              <div className={`bold ${handleInlineStyle("bold")}`}>
                <button
                  onClick={() => toggleStyles("bold")}
                  className={`border rounded-md px-3 font-bold ${handleInlineStyle(
                    "bold"
                  )}`}
                >
                  B
                </button>
              </div>
              <div className={`italic ${handleInlineStyle("italic")}`}>
                <button
                  onClick={() => toggleStyles("italic")}
                  className={`border rounded-md px-3 italic ${handleInlineStyle(
                    "italic"
                  )}`}
                >
                  I
                </button>
              </div>
              <div className={`underline ${handleInlineStyle("underline")}`}>
                <button
                  onClick={() => toggleStyles("underline")}
                  className={`border rounded-md px-3 underline font-semibold ${handleInlineStyle(
                    "underline"
                  )}`}
                >
                  U
                </button>
              </div>
              <div
                className={`superscript ${handleInlineStyle("superscript")}`}
              >
                <button
                  onClick={() => toggleStyles("superscript")}
                  className={`border rounded-md px-3 py-1 font-semibold ${handleInlineStyle(
                    "superscript"
                  )}`}
                >
                  <RiSuperscript />
                </button>
              </div>
              <div className={`subscript ${handleInlineStyle("subscript")}`}>
                <button
                  onClick={() => toggleStyles("subscript")}
                  className={`border rounded-md px-3 py-1 font-semibold ${handleInlineStyle(
                    "subscript"
                  )}`}
                >
                  <LuSubscript />
                </button>
              </div>

              {/* Quote */}
              <div className={`quote ${quoteClicked ? "quote-clicked" : ""}`}>
                <button
                  onClick={handleQuoteClick1}
                  className={`border rounded-md px-3 py-1 delete font-semibold`}
                >
                  <ImQuotesLeft className="text-[#448AFF]" />
                </button>
              </div>
              <div className={`quote ${quoteClicked ? "quote-clicked" : ""}`}>
                <button
                  onClick={handleQuoteClick2}
                  className={`border rounded-md px-3 py-1 delete font-semibold`}
                >
                  <ImQuotesLeft className="text-[#FF9100]" />
                </button>
              </div>
              <div className={`quote ${quoteClicked ? "quote-clicked" : ""}`}>
                <button
                  onClick={handleQuoteClick3}
                  className={`border rounded-md px-3 py-1 delete font-semibold`}
                >
                  <ImQuotesLeft className="text-[#AB47BC]" />
                </button>
              </div>
              <div className={`quote ${quoteClicked ? "quote-clicked" : ""}`}>
                <button
                  onClick={handleQuoteClick4}
                  className={`border rounded-md px-3 py-1 delete font-semibold`}
                >
                  <ImQuotesLeft className="text-gray-300" />
                </button>
              </div>

              {/* code */}
              <div>
                <div className={`code ${isCodeClicked ? "code-clicked" : ""}`}>
                  <button
                    onClick={handleCode}
                    className={`border rounded-md px-3 py-1 delete font-semibold`}
                  >
                    <IoCode />
                  </button>
                </div>
              </div>

              {/* direction: left center right */}
              <div className="select flex gap-5 ">
                <button
                  onClick={() => handleAlignment("left")}
                  className="align-button"
                >
                  <FaAlignLeft />
                </button>
                <button
                  onClick={() => handleAlignment("center")}
                  className="align-button"
                >
                  <FaAlignCenter />
                </button>
                <button
                  onClick={() => handleAlignment("right")}
                  className="align-button"
                >
                  <FaAlignRight />
                </button>
                <button
                  onClick={() => handleAlignment("justify")}
                  className="align-button"
                >
                  <FaAlignJustify />
                </button>
              </div>

              {/* Color Picker */}
              <div className="color-picker ml-10">
                <div className="relative">
                  <button
                    onClick={toggleColorPicker}
                    className="border rounded-md px-3 py-1 delete font-semibold"
                  >
                    <IoMdColorWand />
                  </button>

                  {showColorPicker && (
                    <div className="absolute top-10 left-0 z-10">
                      <SketchPicker
                        color={selectedColor}
                        onChange={handleColorChange}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Background Color */}
              <div className="color-picker ">
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowBackgroundColorPicker(!showBackgroundColorPicker)
                    }
                    className="border rounded-md px-3 py-1 delete font-semibold"
                  >
                    <IoIosColorPalette />
                  </button>

                  {showBackgroundColorPicker && (
                    <div className="absolute top-10 left-0 z-10">
                      <SketchPicker
                        color={selectedBackgroundColor}
                        onChange={handleBackgroundColorChange}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Highlight button */}
              <div>
                <button
                  onClick={handleHighlight}
                  className="border rounded-md px-3 py-1 font-semibold"
                >
                  <MdBorderColor />
                </button>
              </div>

              {/* Eraser */}
              <div>
                <button
                  onClick={handleEraser}
                  className="border rounded-md px-3 py-1 font-semibold"
                >
                  <FaEraser />
                </button>
              </div>

              {/* Table */}
              <div>
                <div>
                  <button
                    className="p-2 border rounded-full"
                    onClick={() => setShowTableDialog(!showTableDialog)}
                  >
                    <FaTableCells />
                  </button>
                </div>
              </div>

              {/*  Image */}
              <div>
                <div>
                  <label htmlFor="image-upload">
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    <FaCloudUploadAlt className="border rounded-md text-5xl px-3 py-1 font-semibold" />
                  </label>
                </div>
              </div>
            </section>

            <section className="bottom mt-5">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-5 ml-10">
                {/* Font Family */}
                <div className="select">
                  <select
                    className="border rounded-md px-3 py-1 font-semibold"
                    onChange={handleFontFamily}
                    defaultValue="Arial"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                    <option value="Cursive">Cursive</option>
                    <option value="Pacifico">Pacifico</option>
                    <option value="Great Vibes">Great Vibes</option>
                    <option value="Kaushan Script">Kaushan Script</option>
                  </select>
                </div>

                {/* Font Size */}
                <select
                  value={selectedFontSize}
                  onChange={handleFontSizeChange}
                  className="border rounded-md px-3 py-1 font-semibold w-20 ml-10 "
                >
                  {[...Array(92)].map((_, index) => (
                    <option key={index} value={index + 5 + "px"}>
                      {index + 5}px
                    </option>
                  ))}
                </select>

                {/* Unordered list select */}
                <div className="select ">
                  <select
                    value={selectedStyles.unorderedList}
                    onChange={(e) => handleUnorderList(e.target.value)}
                    className="border rounded-md px-3 py-1 font-semibold"
                  >
                    <option value="square">Square</option>
                    <option value="circle">Circle</option>
                    <option value="disc">Disc</option>
                  </select>
                </div>

                {/* Ordered list select */}
                <div className="select ">
                  <select
                    value={selectedStyles.orderedList}
                    onChange={(e) => handleOrderedList(e.target.value)}
                    className="border rounded-md px-3 py-1 font-semibold w-32 md:w-40 -ml-5 md:-ml-0"
                  >
                    <option value="1">Number</option>
                    <option value="i">Roman (Upper)</option>
                    <option value="I">Roman (Lower)</option>
                    <option value="A">Capital Letter</option>
                    <option value="a">Small Letter</option>
                  </select>
                </div>
              </div>
            </section>
          </div>

          {/* Textarea */}

          <div className="w-full">
            <div
              ref={editorRef}
              className="editor border px-4 py-10 overflow-auto outline-none"
              contentEditable="true"
              onInput={updateSelectedStyles}
              onKeyPress={handleTextInput}
              onKeyDown={handleKeyDown}
              onPaste={(e) => handlePaste(e)}
              style={{ width: "100%" }}
            >
              {/* image */}
              <div
                className=""
                contentEditable="true"
                onInput={updateSelectedStyles}
                onKeyPress={handleTextInput}
                onKeyDown={handleKeyDown}
              >
                {selectedImage && (
                  <div className="mt-4">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="max-w-full h-auto inline-block px-5"
                      style={{ maxHeight: "200px", maxWidth: "100%" }}
                    />
                  </div>
                )}
              </div>
              {/* table */}
              {showTableDialog && (
                <div className="mt-4">
                  <input
                    type="number"
                    placeholder="Number of rows"
                    value={numRows}
                    onChange={(e) => setNumRows(parseInt(e.target.value))}
                    className="border p-2 mr-2"
                  />
                  <input
                    type="number"
                    placeholder="Number of columns"
                    value={numCols}
                    onChange={(e) => setNumCols(parseInt(e.target.value))}
                    className="border p-2 mr-2"
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={insertTable}
                  >
                    Insert Table
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TextEditor;
