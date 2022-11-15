import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";

import "./style.css";

const contentExpression = "subject paragraph+";

const content = document.querySelector("#content");

content &&
  new EditorView(document.querySelector("#editor"), {
    state: EditorState.create({
      doc: DOMParser.fromSchema(
        new Schema({
          nodes: {
            doc: { content: contentExpression },
            subject: {
              content: "text*",
              toDOM() {
                return ["subject", 0];
              },
            },
            paragraph: {
              content: "text*",
              toDOM() {
                return ["p", 0];
              },
            },
            text: {},
          },
        })
      ).parse(content),
    }),
    plugins: [keymap(baseKeymap)],
  });
