import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { BasicDetailsService } from '../../core/services/basic.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../../core/core.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatChipsModule,
    HttpClientModule,
    CoreModule,
    MatCheckboxModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'], // Use styleUrls with an 's'
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ]
})
export class VehicleComponent {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  stateListData: any = [];
  selectedStates: string[] = [];

  showMoreButton: boolean = true;
  showMore: boolean = false;
  visibleStates: { state: string }[] = [];
  isToggled = false;
  currentStep: number = 0;

  vehicleCapacity: any;
  selectedVehicleType: any = null;
  selectedVehicle: any = null;
  selectedLcvBody: any = null;
  selectLCVFeetType: any = null;
  selectedTruckBody: any = null;
  selectedTruckTyreSize: any = null;
  selectedTruckSizeInFt: any = null;
  selectedHyvaTyreSize: any = null;
  selectedTrailerSize: any = null;
  selectedTankerBody: any = null;
  selectedContainerTyreSize: any = null;
  selectedContainerLength: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private basicService: BasicDetailsService,
    public themeService: CustomizerSettingsService
  ) {
    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
  }
  // Dark Mode
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

  ngOnInit() {
    this.getCityListAccordingState();
    this.firstFormGroup = this.formBuilder.group({
      vehicleno: ['', [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$')]]
    });
    this.secondFormGroup = this.formBuilder.group({
      capacity: ['', [Validators.required, this.capacityValidator]]
    });
  }
  capacityValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value < 1) {
      return { minCapacity: true };
    } else if (value > 100) {
      return { maxCapacity: true };
    }
    return null;
  }
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const uppercasedValue = input.value.toUpperCase();
    this.firstFormGroup.get('vehicleno')?.setValue(uppercasedValue, { emitEvent: false });
  }
  getCityListAccordingState() {
    this.basicService.getStateFromJson().subscribe((res: any) => {
      this.stateListData = res.states;
      this.updateVisibleStates();
    })
  }
  toggleStateSelection(state: string) {
    const index = this.selectedStates.indexOf(state);
    if (index === -1) {
      this.selectedStates.push(state);
    } else {
      this.selectedStates.splice(index, 1);
    }
  }

  selectAllRoutes(event: any) {
    if (event.checked) {
      this.selectedStates = this.stateListData.map((s: any) => s.state);
    } else {
      this.selectedStates = [];
    }
  }
  toggleShowMore() {
    this.showMore = !this.showMore;
    this.updateVisibleStates();
  }

  updateVisibleStates() {
    this.visibleStates = this.showMore ? this.stateListData : this.stateListData.slice(0, 5);
    this.showMoreButton = this.stateListData.length > 5;
  }
  onStepChange(event: StepperSelectionEvent) {
    this.currentStep = event.selectedIndex;
  }
  selectVehicleBody(data: any) {
    this.selectedVehicle = null;
    this.selectedLcvBody = null;
    this.selectLCVFeetType = null;
    this.selectedTruckBody = null;
    this.selectedTruckTyreSize = null;
    this.selectedTruckSizeInFt = null;
    this.selectedHyvaTyreSize = null;
    this.selectedTrailerSize = null;
    this.selectedTankerBody = null;
    this.selectedContainerTyreSize = null;
    this.selectedContainerLength = null;
    this.selectedVehicle = data;
  }
  onVehicleTypeSelect(vehicleType: string) {
    this.selectedVehicle = null;
    this.selectedLcvBody = null;
    this.selectedTruckBody = null;
    this.selectLCVFeetType = null;
    this.selectedTruckTyreSize = null;
    this.selectedTruckSizeInFt = null;
    this.selectedHyvaTyreSize = null;
    this.selectedTrailerSize = null;
    this.selectedTankerBody = null;
    this.selectedContainerTyreSize = null;
    this.selectedContainerLength = null;

    this.selectedVehicleType = vehicleType;
  }
  onKeyUp(event: KeyboardEvent): void {
    this.selectedVehicleType = null;
    const input = (event.target as HTMLInputElement).value;
    this.vehicleCapacity = input;
  }
  selectLCVBodyType(LcvBody: string) {
    this.selectedLcvBody = LcvBody;
  }
  selectedLcvFeet(val: any) {
    this.selectLCVFeetType = val;
  }
  selectTruckBodyType(val: any) {
    this.selectedTruckBody = val;
  }
  selectTruckTyreSize(val: any) {
    this.selectedTruckTyreSize = val;
  }
  selectTruckSizeInFit(val: any) {
    this.selectedTruckSizeInFt = val;
  }
  selectHyvaTyreSize(val: any) {
    this.selectedHyvaTyreSize = val;
  }
  selectTrailerSize(val: any) {
    this.selectedTrailerSize = val;
  }
  selectTankerBody(val: any) {
    this.selectedTankerBody = val;
  }

  selectContainerTyreSize(val: any) {
    this.selectedContainerTyreSize = val;
  }
  selectContainerLengthSize(val: any) {
    this.selectedContainerLength = val;
  }

}
