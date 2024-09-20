import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ProfService } from '../../../../services/prof.service';
import { Prof } from '../../../../models/prof.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-profs',
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

export class AllProfsComponent implements OnInit {
  displayedColumns1: string[] = ['id', 'nom', 'prenom', 'adresse', 'email', 'telephone'];
  dataSource1: Prof[] = [];

  constructor(private profService: ProfService, private router: Router) {}

  ngOnInit(): void {
    this.profService.getAllProfs().subscribe((data: Prof[]) => {
      this.dataSource1 = data;
    });
  }

  onEditProf(id: string): void {
    this.router.navigate(['/ui-components/profs/edit', id]);
  }

  onDeleteProf(id: string): void {
    this.profService.deleteProf(id).subscribe(() => {
      this.dataSource1 = this.dataSource1.filter(prof => prof.id !== id);
    });
  }
}
