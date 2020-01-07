import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DndDraggable } from '../directives/dnd-draggable';
import { DndHandle } from '../directives/dnd-handle';
import { DndList } from '../directives/dnd-list';
import { DndNoDrag } from '../directives/dnd-nodrag';
import { DndState } from '../services/DndState';

@NgModule({
  imports: [CommonModule],
  exports: [DndDraggable, DndHandle, DndList, DndNoDrag],
  entryComponents: [],
  declarations: [DndDraggable, DndHandle, DndList, DndNoDrag],
  providers: [DndState]
})
export class DndListModule {}
