import { Component, OnInit } from '@angular/core';

import 'codemirror/mode/javascript/javascript';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  content:string;
  constructor() {
    this.content = 'function findSequence(goal) {\n function find(start, history) {'
    this.content+= '    if (start == goal)\n'
    this.content+= '      return history;\n'
    this.content+= '    else if (start > goal)\n'
    this.content+= '      return null;\n'
    this.content+= '    else\n'
    this.content+= '      return find(start + 5, "(" + history + " + 5)") ||\n'
    this.content+= '             find(start * 3, "(" + history + " * 3)");\n'
    this.content+= '  }\n'
    this.content+= '  return find(1, "1");\n'
    this.content+= '}\n'
   }

  ngOnInit(): void {
  }

}
