import {Component, OnInit} from '@angular/core';
import {ModuleService} from "../../../../controller/service/module.service";
import {Module} from "../../../../controller/modules/module.model";

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {

  constructor(private moduleService: ModuleService) {
  }

  ngOnInit(): void {
    this.moduleService.getAll().subscribe(m => this.modules = m);
  }

  get modules(): Array<Module> {
    return this.moduleService.modules;
  }

  set modules(value: Array<Module>) {
    this.moduleService.modules = value;
  }

  get showEdit(): boolean {
    return this.moduleService.showEdit;
  }

  set showEdit(value: boolean) {
    this.moduleService.showEdit = value;
  }

  get selectedModule(): Module {
    return this.moduleService.selectedModule;
  }

  set selectedModule(value: Module) {
    this.moduleService.selectedModule = value;
  }


  openNewModule() {
    this.selectedModule = new Module();
    this.showEdit = true;
  }

  updateModule(module: Module) {
    this.selectedModule = module;
    this.showEdit = true;
  }
}
