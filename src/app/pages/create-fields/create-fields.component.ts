import { Component } from '@angular/core';
import { schemaAlergias, schemaBase, schemaMedicamentos } from '../../components/custom-form/utils/base';
import { advancedSchema, complexSchema, errorSchema } from '../../components/custom-form/utils/examples';


@Component({
  selector: 'app-create-fields',
  templateUrl: './create-fields.component.html',
  styleUrls: ['./create-fields.component.scss'],
})
export class CreateFieldsComponent {
  public schemas = [
    { schema: schemaBase, isRecursive: true, debug: true  },
    { schema: schemaAlergias, isRecursive: false, debug: false  },
    { schema: schemaMedicamentos, isRecursive: false, debug: false  },
    // { schema: complexSchema, isRecursive: false, debug: false  },
    // { schema: errorSchema, isRecursive: true, debug: true },
    // { schema: errorSchema, isRecursive: false, debug: true },
  ];
}
