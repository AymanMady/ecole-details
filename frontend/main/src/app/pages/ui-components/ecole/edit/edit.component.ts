import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { EcoleService } from '../../../../services/ecole.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ecole } from '../../../../models/ecole.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './edit.component.html',
})
export class EditEcoleComponent implements OnInit {
  displayedColumns1: string[] = ['id', 'nom', 'adresse', 'actions'];
  dataSource1: Ecole[] = [];
  editForm: FormGroup;
  selectedEcole: Ecole | null = null;

  constructor(
    private ecoleService: EcoleService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ecoleService.getAllEcoles().subscribe((data: Ecole[]) => {
      this.dataSource1 = data;
    });

    const ecoleId = this.route.snapshot.paramMap.get('id');
    if (ecoleId) {
      this.loadEcoleDetails(ecoleId);
    }
  }

  loadEcoleDetails(id: string) {
    this.ecoleService.getEcoleById(id).subscribe((ecole: Ecole) => {
      this.selectedEcole = ecole;
      this.editForm.patchValue({
        id: ecole.id,
        nom: ecole.nom,
        adresse: ecole.adresse,
      });
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedEcole = this.editForm.value;
      this.ecoleService.updateEcole(updatedEcole.id, updatedEcole).subscribe({
        next: (response) => {
          console.log('École mise à jour avec succès', response);
          this.router.navigate(['/ui-components/ecoles']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l\'école', error);
        },
      });
    }
  }

  editEcole(id: string) {
    this.router.navigate(['/ecoles/edit', id]);
  }
}
