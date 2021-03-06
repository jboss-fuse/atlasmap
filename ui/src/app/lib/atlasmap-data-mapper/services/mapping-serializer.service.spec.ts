/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { MappingSerializer } from './mapping-serializer.service';
import { ConfigModel } from '../models/config.model';
import { ErrorHandlerService } from './error-handler.service';
import { DocumentType } from '../common/config.types';
import { DocumentDefinition } from '../models/document-definition.model';
import { Field } from '../models/field.model';
import { LoggerModule, NgxLoggerLevel, NGXLogger } from 'ngx-logger';
import { MappingManagementService } from './mapping-management.service';
import { FieldActionService } from './field-action.service';

describe('MappingSerializer', () => {
  let cfg: ConfigModel;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}) ],
      providers: [
        ErrorHandlerService,
        FieldActionService,
        MappingManagementService,
        NGXLogger,
      ],
    });
    cfg = ConfigModel.getConfig();
    jasmine.getFixtures().fixturesPath = 'base/test-resources/mapping';

    const twitter = new DocumentDefinition();
    twitter.type = DocumentType.JAVA;
    twitter.name = 'twitter4j.Status';
    twitter.isSource = true;
    twitter.id = 'twitter4j.Status';
    twitter.uri = 'atlas:java?className=twitter4j.Status';
    const user = new Field();
    user.name = 'User';
    user.path = '/User';
    user.type = 'COMPLEX';
    twitter.addField(user);
    const userName = new Field();
    userName.name = 'Name';
    userName.path = '/User/Name';
    userName.type = 'STRING';
    userName.parentField = user;
    twitter.addField(userName);
    const userScreenName = new Field();
    userScreenName.name = 'ScreenName';
    userScreenName.path = '/User/ScreenName';
    userScreenName.type = 'STRING';
    userScreenName.parentField = user;
    twitter.addField(userScreenName);
    const text = new Field();
    text.name = 'Text';
    text.path = '/Text';
    text.type = 'STRING';
    twitter.addField(text);
    twitter.initializeFromFields();
    cfg.sourceDocs.push(twitter);
    const jsonSource = new DocumentDefinition();
    jsonSource.type = DocumentType.JSON;
    jsonSource.name = 'SomeJsonSource';
    jsonSource.isSource = true;
    jsonSource.id = 'SomeJsonSource';
    jsonSource.uri = 'atlas:json:SomeJsonSource';
    const js0 = new Field();
    js0.name = 'js0';
    js0.path = '/js0';
    js0.type = 'STRING';
    jsonSource.addField(js0);
    const js1 = new Field();
    js1.name = 'js1';
    js1.path = '/js1';
    js1.type = 'STRING';
    jsonSource.addField(js1);
    jsonSource.initializeFromFields();
    cfg.sourceDocs.push(jsonSource);
    const xmlSource = new DocumentDefinition();
    xmlSource.type = DocumentType.XML;
    xmlSource.name = 'SomeXmlSource';
    xmlSource.isSource = true;
    xmlSource.id = 'SomeXmlSource';
    xmlSource.uri = 'atlas:xml:SomeXmlSource';
    const xs0 = new Field();
    xs0.name = 'xs0';
    xs0.path = '/xs0';
    xs0.type = 'STRING';
    xmlSource.addField(xs0);
    const xs1 = new Field();
    xs1.name = 'xs1';
    xs1.path = '/xs1';
    xs1.type = 'STRING';
    xmlSource.addField(xs1);
    xmlSource.initializeFromFields();
    cfg.sourceDocs.push(xmlSource);
    const contact = new DocumentDefinition();
    contact.type = DocumentType.JAVA;
    contact.name = 'salesforce.Contact';
    contact.isSource = false;
    contact.id = 'salesforce.Contact';
    contact.uri = 'atlas:java?className=org.apache.camel.salesforce.dto.Contact';
    const desc = new Field();
    desc.name = 'Description';
    desc.path = '/Description';
    desc.type = 'STRING';
    contact.addField(desc);
    const title = new Field();
    title.name = 'Title';
    title.path = '/Title';
    title.type = 'STRING';
    contact.addField(title);
    const firstName = new Field();
    firstName.name = 'FirstName';
    firstName.path = '/FirstName';
    firstName.type = 'STRING';
    contact.addField(firstName);
    const lastName = new Field();
    lastName.name = 'LastName';
    lastName.path = '/LastName';
    lastName.type = 'STRING';
    contact.addField(lastName);
    contact.initializeFromFields();
    cfg.targetDocs.push(contact);
    const jsonTarget = new DocumentDefinition();
    jsonTarget.type = DocumentType.JSON;
    jsonTarget.name = 'SomeJsonTarget';
    jsonTarget.isSource = false;
    jsonTarget.id = 'SomeJsonTarget';
    jsonTarget.uri = 'atlas:json:SomeJsonTarget';
    const jt0 = new Field();
    jt0.name = 'jt0';
    jt0.path = '/jt0';
    jt0.type = 'STRING';
    jsonTarget.addField(jt0);
    const jt1 = new Field();
    jt1.name = 'jt1';
    jt1.path = '/jt1';
    jt1.type = 'STRING';
    jsonTarget.addField(jt1);
    jsonTarget.initializeFromFields();
    cfg.targetDocs.push(jsonTarget);
    const xmlTarget = new DocumentDefinition();
    xmlTarget.type = DocumentType.XML;
    xmlTarget.name = 'SomeXmlTarget';
    xmlTarget.isSource = true;
    xmlTarget.id = 'SomeXmlTarget';
    xmlTarget.uri = 'atlas:xml:SomeXmlTarget';
    const xt0 = new Field();
    xt0.name = 'xt0';
    xt0.path = '/xt0';
    xt0.type = 'STRING';
    xmlTarget.addField(xt0);
    const xt1 = new Field();
    xt1.name = 'xt1';
    xt1.path = '/xt1';
    xt1.type = 'STRING';
    xmlTarget.addField(xt1);
    const xt2 = new Field();
    xt2.name = 'xt2';
    xt2.path = '/xt2';
    xt2.type = 'STRING';
    xmlTarget.addField(xt2);
    xmlTarget.initializeFromFields();
    cfg.targetDocs.push(xmlTarget);
  });

  it('should deserialize & serialize mapping definition',
    inject(
      [ErrorHandlerService, FieldActionService],
      (errorService: ErrorHandlerService, fieldActionService: FieldActionService) => {
      errorService.cfg = cfg;
      cfg.errorService = errorService;
      fieldActionService.cfg = cfg;
      cfg.fieldActionService = fieldActionService;
      const mappingJson = JSON.parse(jasmine.getFixtures().read('atlasmapping-test.json'));
      jasmine.getFixtures().fixturesPath = 'base/test-resources/fieldActions';
      fieldActionService.cfg.preloadedFieldActionMetadata = JSON.parse(jasmine.getFixtures().read('atlasmap-field-action.json'));
      fieldActionService.fetchFieldActions();
      MappingSerializer.deserializeMappingServiceJSON(mappingJson, cfg);
      cfg.mappings.updateMappingsFromDocuments(cfg);
      expect(cfg.mappings.mappings.length).toEqual(Object.keys(mappingJson.AtlasMapping.mappings.mapping).length);

      const serialized = MappingSerializer.serializeMappings(cfg);
      // TODO constants, properties and field actions are not restored properly... need to investigate
      console.log(JSON.stringify(serialized, null, 2));
      expect(Object.keys(serialized.AtlasMapping.mappings.mapping).length).toEqual(cfg.mappings.mappings.length);
    }));
});
