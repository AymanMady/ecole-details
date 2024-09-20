import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { EcoleService } from '../../../../services/ecole.service';
import { Ecole } from '../../../../models/ecole.model';
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
export class AllEcolesComponent implements OnInit {
  displayedColumns1: string[] = ['id', 'nom', 'adresse'];
  dataSource1: Ecole[] = [];

  constructor(private ecoleService: EcoleService,private router: Router) {}

  ngOnInit(): void {
    this.ecoleService.getAllEcoles().subscribe((data: Ecole[]) => {
      this.dataSource1 = data;
    });
  }

  onEditEcole(id: string): void {
    this.router.navigate(['/ui-components/ecoles/edit', id]);
  }

  onDeleteEcole(id: number): void {
    this.ecoleService.deleteEcole(id).subscribe(() => {
      this.dataSource1 = this.dataSource1.filter(ecole => ecole.id !== id);
    });
  }
}
