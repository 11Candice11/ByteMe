import { LitElement, html, css } from 'lit';
import '/src/components/CollapseComponent.js';
import { ViewBase } from '../ViewBase.js';
import { sharedStyles } from '../../styles/shared-styles.js';

class ClientDetails extends ViewBase {
  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        font-family: Arial, sans-serif;
        padding: 20px;
        overflow: auto;
        max-height: 840px;
        margin: 0 auto;
      }

      h2 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 20px;
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #495057;
        font-weight: 500;
      }

      input,
      select {
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        box-sizing: border-box;
      }

      button {
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
        background-color: #6c757d;
        border: none;
      }

      .form-inline {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .content-group {
        background-color: #f8f9fa;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 15px;
      }

      .btn-group {
        display: none;
        justify-content: space-between;
        margin-top: 20px;
      }

      .back-button {
        border: 0px;
        background-color: transparent;
        cursor: pointer;
        font-size: 1.2rem;
      }

      .row {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
      }

      .col-md-6 {
        flex: 1 1 calc(50% - 20px);
      }

      @media (max-width: 768px) {
        .col-md-6 {
          flex: 1 1 100%;
        }

        .btn-group {
          flex-direction: column;
          gap: 10px;
        }

        .row {
          flex-direction: column;
          gap: 10px;
        }
      }
    `,
  ];

  static properties = {
    clientName: { type: String },
    changesMade: { type: Boolean }
  };

  constructor() {
    super();
    this.clientName = '';
    this.changesMade = false;
    this.surname = ``;
    this.name = ``;
    this.nickname = ``;
    this.idNumber = ``;
    this.passport = ``;
    this.passportExpiry = ``;
    this.dependants = 0;
    this.dateDeceased = ``;
    this.email = ``;
    this.telephone = ``;
    this.address = ``;
    // this.initialise();
  }

  connectedCallback() {
    super.connectedCallback();
    const urlParams = new URLSearchParams(window.location.search);
    this.clientName = urlParams.get('client');
  }

  firstUpdated() {
    // Listen for changes in the input fields
    const inputs = this.shadowRoot.querySelectorAll('input, select');
    inputs.forEach(input => {
      input.addEventListener('input', () => this.handleInputChange());
    });
  }

  handleInputChange() {
    this.changesMade = true;
    const btnGroup = this.shadowRoot.querySelector('.btn-group');
    btnGroup.style.display = 'flex';
  }

  initialise() {
    if(this.clientName === ``) {
      this.surname = `Bernhardt`;
      this.name = `Natalie`;
      this.nickname = `Nat`;
      this.idNumber = `7712150243080`;
      this.passport = ``;
      this.passportExpiry = ``;
      this.dependants = 1;
      this.dateDeceased = ``;
      this.email = `natalie.benvenuti@ucs-solutions.co.za`;
      this.telephone = `072 640 4035`;
      this.address = `5 Flufftail close, Strand`;  
    }
  }

  render() {
    return html`
      <div>
        <!-- Header and Back Button -->
        <div class="header">
          <button class="back-button" @click="${(e) => this.goBack(e)}">←</button>
          <h2>Client Details for ${this.clientName}</h2>
        </div>

        <!-- General Section -->
        <collapse-component header="General">
          ${this._renderGeneralInfo()}
        </collapse-component>

        <!-- Residency Section -->
        <collapse-component header="Residency">
          ${this._renderResidencyInfo()}
        </collapse-component>

        <!-- Other Section -->
        <collapse-component header="Other">
          ${this._renderOtherInfo()}
        </collapse-component>
      </div>
      
      <div class="btn-group">
        <button class="btn btn-success my-button">Save</button>
        <button class="btn btn-danger my-button">Cancel</button>
      </div>
    `;
  }

  _renderGeneralInfo() {
    return html`
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="title">Title</label>
            <select id="title" class="form-control">
              <option>Mr</option>
              <option>Ms</option>
              <option>Mrs</option>
              <option>Dr</option>
            </select>
          </div>
          <div class="form-group">
            <label for="surname">Surname</label>
            <input type="text" class="form-control" id="surname" value="${this.surname}">
          </div>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" class="form-control" id="firstName" value="${this.name}">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="initials">Initials</label>
            <input type="text" class="form-control" id="initials" placeholder="N" value="${this.name.substring(0,1)}">
          </div>
          <div class="form-group">
            <label for="nickname">Nick Name</label>
            <input type="text" class="form-control" id="nickname" placeholder="Nick Name" value="${this.nickname}">
          </div>
        </div>
      </div>
    `;
  }

  _renderResidencyInfo() {
    return html`
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="saIdNumber">South African ID number</label>
            <input type="text" class="form-control" id="saIdNumber" placeholder="7712150243080" value="${this.idNumber}">
          </div>
          <div class="form-group">
            <label for="countryOfBirth">Country of birth</label>
            <select id="countryOfBirth" class="form-control">
              <option>South Africa</option>
            </select>
          </div>
          <div class="form-group">
            <label for="countryOfResidence">Country of residence</label>
            <select id="countryOfResidence" class="form-control">
              <option>South Africa</option>
            </select>
          </div>
          <div class="form-group">
            <label for="ethnicGrouping">Ethnic grouping</label>
            <select id="ethnicGrouping" class="form-control">
              <option>Unknown</option>
            </select>
          </div>
          <div class="form-group">
            <label for="religion">Religion</label>
            <select id="religion" class="form-control">
              <option>Unknown</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nationality">Nationality</label>
            <select id="nationality" class="form-control">
              <option>South African</option>
            </select>
          </div>
          <div class="form-group">
            <label for="passportNumber">Passport number</label>
            <input type="text" class="form-control" id="passportNumber" placeholder="" value="${this.passport}">
          </div>
          <div class="form-group">
            <label for="passportExpiryDate">Passport expiry date</label>
            <input type="text" class="form-control" id="passportExpiryDate" placeholder="dd/mm/yyyy" value="${this.passportExpiry}">
          </div>
          <div class="form-group">
            <label for="passportCountryOfIssue">Passport country of issue</label>
            <select id="passportCountryOfIssue" class="form-control">
              <option>South Africa</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }

  _renderOtherInfo() {
    return html`
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="dependants">Number of dependants</label>
            <input type="number" class="form-control" id="dependants" value="${this.dependants}">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group form-inline">
            <label for="deceased">Deceased?</label>
            <input type="checkbox" class="form-control" id="deceased">
          </div>
          <div class="form-group">
            <label for="dateDeceased">Date deceased</label>
            <input type="text" class="form-control" id="dateDeceased" placeholder="dd/mm/yyyy" value="${this.dateDeceased}">
          </div>
        </div>
      </div>

      <div class="content-group">
        <div class="form-group">
          <label for="contactType">Preferred contact type</label>
          <select id="contactType" class="form-control">
            <option>Email</option>
            <option>Phone</option>
          </select>
        </div>
        <div class="form-group">
          <label for="meetingPlace">Preferred meeting place</label>
          <select id="meetingPlace" class="form-control">
            <option>Office</option>
            <option>Home</option>
          </select>
        </div>

        <!-- Email Section -->
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" class="form-control" id="email" value="${this.email}">
        </div>

        <!-- Telephone Section -->
        <div class="form-group">
          <label for="phoneType">Telephone type</label>
          <select id="phoneType" class="form-control">
            <option>Cell phone</option>
            <option>Office</option>
          </select>
        </div>
        <div class="form-group">
          <label for="phoneNumber">Telephone number</label>
          <input type="text" class="form-control" id="phoneNumber" value="${this.telephone}">
        </div>

        <!-- Address Section -->
        <div class="form-group">
          <label for="address">Address</label>
          <input type="text" class="form-control" id="address" placeholder="" value="${this.address}">
        </div>
      </div>
    `;
  }
}

customElements.define('my-client', ClientDetails);
