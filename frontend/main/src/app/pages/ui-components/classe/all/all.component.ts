import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ClasseService } from '../../../../services/classe.service';
import { Classe } from '../../../../models/classe.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './all.component.html',
})
export class AllClassesComponent implements OnInit {
  displayedColumns1: string[] = ['id', 'libelle_classe'];
  dataSource1: Classe[] = [];

  constructor(private classeService: ClasseService, private router: Router) {}

  ngOnInit(): void {
    this.classeService.getAllClasses().subscribe((data: Classe[]) => {
      this.dataSource1 = data;
    });
  }

  onEditClasse(id: string): void {
    this.router.navigate(['/ui-components/classes/edit', id]);
  }

  onDeleteClasse(id: string): void {  
    this.classeService.deleteClasse(id).subscribe(() => {
      this.dataSource1 = this.dataSource1.filter(classe => classe.id !== id);
    });
  }
}
