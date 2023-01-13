import {Component, OnInit} from '@angular/core';
import {ModuleService} from "../../../../controller/service/module.service";
import {Module} from "../../../../controller/modules/module.model";
import {Specialite} from "../../../../controller/modules/specialite.model";
import {SpecialiteService} from "../../../../controller/service/specialite.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-module-create',
  templateUrl: './module-create.component.html',
  styleUrls: ['./module-create.component.css']
})
export class ModuleCreateComponent implements OnInit {
  specialtes: Array<Specialite> = new Array<Specialite>();

  constructor(private moduleService: ModuleService,
              private toastr: ToastrService,
              private specialiteService: SpecialiteService) {
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

  ngOnInit(): void {
    this.specialiteService.getAll().subscribe(d => this.specialtes = d);
  }


  save() {
    if (this.selectedModule?.id === 0) { //create new
      this.selectedModule.specialiteId = this.selectedModule.specialite.id;
      this.selectedModule.specialite = null;
      this.moduleService.save(this.selectedModule).subscribe(d => {
        console.log(d)
        this.modules.push({...d});
        this.toastr.success('Module created successfully');
        this.showEdit = false;
      }, error => {
        this.toastr.error('something went wrong, please try again.')
        console.log(error)
      });
    } else { // update
      this.moduleService.update(this.selectedModule).subscribe(d => {
        console.log(d)
        this.toastr.info('Module updated successfully');
        this.showEdit = false;
      }, error => {
        this.toastr.error('something went wrong, please try again.')
        console.log(error)
      });
    }
  }


}
