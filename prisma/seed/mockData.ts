import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('293d3476-dd72-4340-b37c-9e5eea3cd3af', '1Erna.Gislason30@yahoo.com', 'Alice Jones', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv445566', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('374a7e20-ecf3-4c33-b7c3-167ce5ef1c94', '9Alessandro97@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=11', 'inv445566', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e42aa28c-e694-48af-adce-911f9bec2bcc', '25Jayce7@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=27', 'inv112233', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('04eb066f-3ca6-48e4-bab2-96edec6410f8', '33Giovanny.Nicolas@hotmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=35', 'inv445566', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('8e956bda-ef85-4b09-8082-8a3d6aa57b9b', '41Cierra.Weimann62@yahoo.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=43', 'inv654321', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('0be203c2-8660-44a9-8c72-fa26371ed15a', '49Granville.Welch55@yahoo.com', 'Bob Brown', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inv778899', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('07e314ed-1b63-46ef-83b2-05a29b5f4369', '57Jennie_Cummerata@yahoo.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=59', 'inv123456', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('06350f52-8132-4336-b8b5-afb04b211c96', '65Donald_Treutel@yahoo.com', 'Alice Jones', 'https://i.imgur.com/YfJQV5z.png?id=67', 'inv778899', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e6c9a048-ca77-4c85-87f1-ada9fdc7a876', '73Yasmin66@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv445566', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('717a89c3-02a6-4e60-a684-42bedfa34e25', 'Future Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=82');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('d143bc47-8336-41c5-9820-9bb902cd66cd', 'Smart Solutions', 'https://i.imgur.com/YfJQV5z.png?id=85');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('698c003a-3f0e-4133-a8b8-acfae735995f', 'Future Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=88');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('28c9b159-edee-427a-b9b6-495acfb6f4b8', 'AI Pioneers', 'https://i.imgur.com/YfJQV5z.png?id=91');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('2bd8dd2c-e198-44a0-ab7f-adc629efbcc4', 'AI Pioneers', 'https://i.imgur.com/YfJQV5z.png?id=94');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('f9e6113c-b9df-4a79-a8e9-39599dd703a6', 'Tech Innovators', 'https://i.imgur.com/YfJQV5z.png?id=97');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('8121000e-d69d-4a9d-abe2-7153d046085f', 'AI Pioneers', 'https://i.imgur.com/YfJQV5z.png?id=100');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('0582f1c2-c80c-4049-9c65-dff5f029fc28', 'Digital Dynamics', 'https://i.imgur.com/YfJQV5z.png?id=103');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('507fea9d-913f-4b5a-a1ad-19ee073c95a6', 'Smart Solutions', 'https://i.imgur.com/YfJQV5z.png?id=106');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('ac1a8724-fd7a-4bdf-a674-7c66f259ae23', 'AI Pioneers', 'https://i.imgur.com/YfJQV5z.png?id=109');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('e51a460e-e764-46aa-9ca4-9be3bfaf0387', 'Sales', '8e956bda-ef85-4b09-8082-8a3d6aa57b9b', 'f9e6113c-b9df-4a79-a8e9-39599dd703a6');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('6d98875f-828d-439f-991c-8864e3378721', 'Support', '04eb066f-3ca6-48e4-bab2-96edec6410f8', '2bd8dd2c-e198-44a0-ab7f-adc629efbcc4');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('ef0677b9-087d-4165-855b-db189f622db6', 'User', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '717a89c3-02a6-4e60-a684-42bedfa34e25');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('f23a795b-b37f-49ba-a7d8-7a8ed7ae9ed3', 'Manager', '06350f52-8132-4336-b8b5-afb04b211c96', 'd143bc47-8336-41c5-9820-9bb902cd66cd');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('f6940e6e-f065-4427-a4b7-4f404f003507', 'Manager', '293d3476-dd72-4340-b37c-9e5eea3cd3af', '717a89c3-02a6-4e60-a684-42bedfa34e25');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('d265713e-36ff-4ce8-b8c1-41a93c771f1b', 'User', 'e6c9a048-ca77-4c85-87f1-ada9fdc7a876', '0582f1c2-c80c-4049-9c65-dff5f029fc28');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('51901385-5bfb-4e04-9492-42abb23c9faa', 'User', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '28c9b159-edee-427a-b9b6-495acfb6f4b8');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('5e1956c1-92db-489e-b6ba-071e1642bc71', 'Admin', '8e956bda-ef85-4b09-8082-8a3d6aa57b9b', 'd143bc47-8336-41c5-9820-9bb902cd66cd');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('64174a6a-8b91-48eb-9672-693b8b0ac3cb', 'User', '06350f52-8132-4336-b8b5-afb04b211c96', 'f9e6113c-b9df-4a79-a8e9-39599dd703a6');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('5ec218c6-50ab-4fc3-97c7-1d6479d3c269', 'Support', 'e42aa28c-e694-48af-adce-911f9bec2bcc', '507fea9d-913f-4b5a-a1ad-19ee073c95a6');

INSERT INTO "Template" ("id", "name", "description", "category", "type", "configuration", "organizationId") VALUES ('6f644fcc-2341-4544-a0b2-d1483c2f3320', 'Escalonamento de Tickets', 'Responde automaticamente perguntas frequentes.', 'Transcrio', 'Avanado', '{"trucido":"textor","cado":"tumultus","sopor":"caries","natus":"carcer","talio":"vinculum"}'::jsonb, '717a89c3-02a6-4e60-a684-42bedfa34e25');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "configuration", "organizationId") VALUES ('11b646b1-d7ca-459a-9075-30c350413233', 'Suporte FAQ', 'Responde automaticamente perguntas frequentes.', 'Vendas', 'Avanado', '{"aliquid":"adulescens","caelum":"creta","clamo":"pauci","claro":"canonicus"}'::jsonb, '8121000e-d69d-4a9d-abe2-7153d046085f');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "configuration", "organizationId") VALUES ('cb6bd781-816b-4543-984d-571c1a253bc8', 'Escalonamento de Tickets', 'Gerencia o escalonamento de tickets de suporte.', 'Suporte', 'Bsico', '{"adicio":"comitatus","adhaero":"tenax","sapiente":"supra","crur":"ultio"}'::jsonb, 'ac1a8724-fd7a-4bdf-a674-7c66f259ae23');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "configuration", "organizationId") VALUES ('6bc36013-16a6-4401-8a26-6fdb4211b33f', 'Escalonamento de Tickets', 'Template para transcrio de udio para texto.', 'Transcrio', 'Avanado', '{"asperiores":"ambulo","vestigium":"in","teneo":"baiulus","deficio":"amaritudo"}'::jsonb, '28c9b159-edee-427a-b9b6-495acfb6f4b8');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "configuration", "organizationId") VALUES ('197e2145-4158-4452-8f21-084c331d33d9', 'Gerao de Leads Avanada', 'Responde automaticamente perguntas frequentes.', 'Vendas', 'Bsico', '{"tabella":"vicissitudo","suppellex":"talio","concido":"thymbra","facere":"sto"}'::jsonb, '2bd8dd2c-e198-44a0-ab7f-adc629efbcc4');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "configuration", "organizationId") VALUES ('5b77b223-30c6-4b0e-9aa2-ad36ccecb1e0', 'Escalonamento de Tickets', 'Automatiza o processo de gerao de leads.', 'Transcrio', 'Avanado', '{"tantum":"universe","tristis":"amaritudo","denuncio":"ab"}'::jsonb, 'd143bc47-8336-41c5-9820-9bb902cd66cd');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "configuration", "organizationId") VALUES ('beacd7ae-821b-4d3e-b2bc-99632643e9b9', 'Escalonamento de Tickets', 'Auxilia no fechamento de vendas com clientes.', 'Transcrio', 'Bsico', '{"adsidue":"auctor","molestiae":"hic","et":"similique","territo":"derideo"}'::jsonb, 'd143bc47-8336-41c5-9820-9bb902cd66cd');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "configuration", "organizationId") VALUES ('b8325ed4-fda5-47c4-bf4b-d88a46eab4bb', 'Transcrio Bsica', 'Responde automaticamente perguntas frequentes.', 'Transcrio', 'Bsico', '{"tredecim":"corona","cenaculum":"aveho","cogo":"collum","sopor":"suppono","volup":"despecto"}'::jsonb, '698c003a-3f0e-4133-a8b8-acfae735995f');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "configuration", "organizationId") VALUES ('83eff650-f67f-4c19-9d7d-05a6319252aa', 'Transcrio Bsica', 'Responde automaticamente perguntas frequentes.', 'Vendas', 'Avanado', '{"velit":"acervus","venustas":"adsum","terreo":"censura","incidunt":"delicate"}'::jsonb, '717a89c3-02a6-4e60-a684-42bedfa34e25');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "configuration", "organizationId") VALUES ('52c9a27d-63aa-40a8-9b8b-385b0f8c0fc0', 'Suporte FAQ', 'Automatiza o processo de gerao de leads.', 'Vendas', 'Bsico', '{"tam":"cras","tricesimus":"cur","eveniet":"cornu"}'::jsonb, 'f9e6113c-b9df-4a79-a8e9-39599dd703a6');

INSERT INTO "Agent" ("id", "name", "status", "language", "timezone", "configuration", "templateId", "organizationId") VALUES ('698f7cc2-b075-43d4-a22f-2b83f390613d', 'Support Guru', 'active', 'Spanish', 'UTC3', '{"vorax":"delicate","cui":"certe","crinis":"dolorum","ulterius":"viriliter"}'::jsonb, 'b8325ed4-fda5-47c4-bf4b-d88a46eab4bb', '2bd8dd2c-e198-44a0-ab7f-adc629efbcc4');
INSERT INTO "Agent" ("id", "name", "status", "language", "timezone", "configuration", "templateId", "organizationId") VALUES ('3797ed9f-44a8-4ff0-ad36-deb84cac089b', 'Support Guru', 'active', 'Spanish', 'UTC8', '{"vulgivagus":"concido","arcesso":"voveo","alioqui":"id","iure":"cunctatio"}'::jsonb, '197e2145-4158-4452-8f21-084c331d33d9', '698c003a-3f0e-4133-a8b8-acfae735995f');
INSERT INTO "Agent" ("id", "name", "status", "language", "timezone", "configuration", "templateId", "organizationId") VALUES ('9ce78db1-436a-4117-8918-f7a8f8e80199', 'Transcriber Pro', 'archived', 'Spanish', 'UTC5', '{"creo":"vehemens","veniam":"tracto","valeo":"surgo","claudeo":"auctus","tego":"confido"}'::jsonb, 'b8325ed4-fda5-47c4-bf4b-d88a46eab4bb', 'ac1a8724-fd7a-4bdf-a674-7c66f259ae23');
INSERT INTO "Agent" ("id", "name", "status", "language", "timezone", "configuration", "templateId", "organizationId") VALUES ('41f31847-70f7-438d-8af1-f48701062ae6', 'Sales Assistant', 'inactive', 'French', 'UTC7', '{"acervus":"auctus","maiores":"vociferor","voco":"quam"}'::jsonb, '52c9a27d-63aa-40a8-9b8b-385b0f8c0fc0', '698c003a-3f0e-4133-a8b8-acfae735995f');
INSERT INTO "Agent" ("id", "name", "status", "language", "timezone", "configuration", "templateId", "organizationId") VALUES ('a5946d7b-3dd8-4b86-aa5a-134a439e1070', 'Lead Generator', 'suspended', 'English', 'UTC3', '{"conduco":"eveniet","aliquam":"tonsor","viriliter":"synagoga","quibusdam":"brevis","atqui":"uxor"}'::jsonb, '6f644fcc-2341-4544-a0b2-d1483c2f3320', '8121000e-d69d-4a9d-abe2-7153d046085f');
INSERT INTO "Agent" ("id", "name", "status", "language", "timezone", "configuration", "templateId", "organizationId") VALUES ('8030f526-52c0-413a-9fa5-330dd7bb207c', 'Lead Generator', 'active', 'Spanish', 'UTC7', '{"quidem":"corrigo","vallum":"supellex","conculco":"delego"}'::jsonb, '197e2145-4158-4452-8f21-084c331d33d9', '698c003a-3f0e-4133-a8b8-acfae735995f');
INSERT INTO "Agent" ("id", "name", "status", "language", "timezone", "configuration", "templateId", "organizationId") VALUES ('73d60f81-2622-4bcc-8a3a-bcb50a085b92', 'ChatBot Alpha', 'inactive', 'German', 'UTC8', '{"iste":"terga","cunae":"compello","maxime":"natus","uxor":"atqui"}'::jsonb, '11b646b1-d7ca-459a-9075-30c350413233', 'ac1a8724-fd7a-4bdf-a674-7c66f259ae23');
INSERT INTO "Agent" ("id", "name", "status", "language", "timezone", "configuration", "templateId", "organizationId") VALUES ('7aed13d0-dbf0-485a-bdcd-461f55ee007a', 'Support Guru', 'active', 'English', 'UTC1', '{"certus":"vita","bos":"suscipit","vehemens":"thesis","quo":"vulpes","ratione":"tamisium"}'::jsonb, '11b646b1-d7ca-459a-9075-30c350413233', '28c9b159-edee-427a-b9b6-495acfb6f4b8');
INSERT INTO "Agent" ("id", "name", "status", "language", "timezone", "configuration", "templateId", "organizationId") VALUES ('e0783848-b948-449d-b544-b03b3ce8069f', 'Transcriber Pro', 'archived', 'Portuguese', 'UTC1', '{"conscendo":"agnosco","fugit":"ullus","careo":"aliquid"}'::jsonb, '52c9a27d-63aa-40a8-9b8b-385b0f8c0fc0', 'f9e6113c-b9df-4a79-a8e9-39599dd703a6');
INSERT INTO "Agent" ("id", "name", "status", "language", "timezone", "configuration", "templateId", "organizationId") VALUES ('7ad9b827-508d-46a6-b610-a47acf3defe7', 'Sales Assistant', 'suspended', 'English', 'UTC8', '{"tribuo":"decor","sublime":"surgo","vindico":"amor","officia":"dolores","venio":"cruentus"}'::jsonb, '83eff650-f67f-4c19-9d7d-05a6319252aa', '717a89c3-02a6-4e60-a684-42bedfa34e25');

INSERT INTO "Integration" ("id", "type", "status", "configuration", "agentId", "organizationId") VALUES ('d9eaccdb-7aa6-487b-8e0e-fd47d6a3f214', 'Google Analytics', 'pending', '{"callide":"perspiciatis","creber":"terreo","paulatim":"carcer","aequus":"tremo"}'::jsonb, '7aed13d0-dbf0-485a-bdcd-461f55ee007a', '717a89c3-02a6-4e60-a684-42bedfa34e25');
INSERT INTO "Integration" ("id", "type", "status", "configuration", "agentId", "organizationId") VALUES ('b48d9d19-d448-48d7-b9a4-14d1572ef767', 'WhatsApp', 'pending', '{"iusto":"vestrum","totus":"articulus","volup":"tam"}'::jsonb, '41f31847-70f7-438d-8af1-f48701062ae6', '0582f1c2-c80c-4049-9c65-dff5f029fc28');
INSERT INTO "Integration" ("id", "type", "status", "configuration", "agentId", "organizationId") VALUES ('88027ef6-6df5-445b-a6ee-67370060821f', 'N8N', 'failed', '{"demitto":"angustus","curvo":"statua","ipsam":"aliquam","capillus":"agnosco"}'::jsonb, '698f7cc2-b075-43d4-a22f-2b83f390613d', '0582f1c2-c80c-4049-9c65-dff5f029fc28');
INSERT INTO "Integration" ("id", "type", "status", "configuration", "agentId", "organizationId") VALUES ('7d4d0488-0035-4704-9ffa-073fec5bed0d', 'Salesforce', 'failed', '{"nesciunt":"demum","peior":"soluta","xiphias":"creptio","aspernatur":"utor"}'::jsonb, '41f31847-70f7-438d-8af1-f48701062ae6', '717a89c3-02a6-4e60-a684-42bedfa34e25');
INSERT INTO "Integration" ("id", "type", "status", "configuration", "agentId", "organizationId") VALUES ('92da827d-59bb-4831-8b9b-df091864cce5', 'N8N', 'completed', '{"recusandae":"arguo","delego":"solus","porro":"similique"}'::jsonb, 'e0783848-b948-449d-b544-b03b3ce8069f', 'ac1a8724-fd7a-4bdf-a674-7c66f259ae23');
INSERT INTO "Integration" ("id", "type", "status", "configuration", "agentId", "organizationId") VALUES ('19b856e9-4e5e-4b85-9c17-9c763bf60867', 'Dify', 'inactive', '{"officiis":"ancilla","suggero":"ater","omnis":"audio","audio":"appono","clamo":"creta"}'::jsonb, '698f7cc2-b075-43d4-a22f-2b83f390613d', 'f9e6113c-b9df-4a79-a8e9-39599dd703a6');
INSERT INTO "Integration" ("id", "type", "status", "configuration", "agentId", "organizationId") VALUES ('8fd3b355-c1b9-4d62-9c19-18f2f5c2f1e5', 'N8N', 'failed', '{"accommodo":"caveo","conitor":"coepi","vulpes":"cogito","caelum":"autem"}'::jsonb, '7aed13d0-dbf0-485a-bdcd-461f55ee007a', '28c9b159-edee-427a-b9b6-495acfb6f4b8');
INSERT INTO "Integration" ("id", "type", "status", "configuration", "agentId", "organizationId") VALUES ('a1412b2f-3662-4cd8-a73e-4d833233969a', 'WhatsApp', 'completed', '{"earum":"ullus","adamo":"una","speculum":"crinis"}'::jsonb, '7aed13d0-dbf0-485a-bdcd-461f55ee007a', '717a89c3-02a6-4e60-a684-42bedfa34e25');
INSERT INTO "Integration" ("id", "type", "status", "configuration", "agentId", "organizationId") VALUES ('a68530f5-318e-41aa-aa11-116805a5c0f9', 'WhatsApp', 'completed', '{"triumphus":"certe","carbo":"cumque","sum":"aestivus","sperno":"abscido"}'::jsonb, '73d60f81-2622-4bcc-8a3a-bcb50a085b92', '2bd8dd2c-e198-44a0-ab7f-adc629efbcc4');
INSERT INTO "Integration" ("id", "type", "status", "configuration", "agentId", "organizationId") VALUES ('732ed9f3-c52c-4fcd-8832-f6aa37c0a948', 'N8N', 'failed', '{"vehemens":"cattus","acies":"suppellex","ipsam":"ascit"}'::jsonb, '9ce78db1-436a-4117-8918-f7a8f8e80199', '8121000e-d69d-4a9d-abe2-7153d046085f');

INSERT INTO "Message" ("id", "content", "status", "type", "agentId", "organizationId") VALUES ('df139fd4-d84e-4a9f-bd37-c46fe8535eb8', 'Estamos analisando sua solicitao.', 'pendente', 'texto', '7ad9b827-508d-46a6-b610-a47acf3defe7', 'ac1a8724-fd7a-4bdf-a674-7c66f259ae23');
INSERT INTO "Message" ("id", "content", "status", "type", "agentId", "organizationId") VALUES ('18d6e06e-7ade-42c1-b308-087487183698', 'Por favor fornea mais detalhes sobre sua dvida.', 'lido', 'documento', '9ce78db1-436a-4117-8918-f7a8f8e80199', '2bd8dd2c-e198-44a0-ab7f-adc629efbcc4');
INSERT INTO "Message" ("id", "content", "status", "type", "agentId", "organizationId") VALUES ('d2dd984b-206d-48a7-b1d7-bc11a21d8801', 'Seu pedido foi confirmado com sucesso.', 'pendente', 'imagem', '698f7cc2-b075-43d4-a22f-2b83f390613d', '0582f1c2-c80c-4049-9c65-dff5f029fc28');
INSERT INTO "Message" ("id", "content", "status", "type", "agentId", "organizationId") VALUES ('b8aa86fc-fbea-48ef-a2cb-554e0ed92121', 'Obrigado por entrar em contato conosco.', 'entregue', 'imagem', '7ad9b827-508d-46a6-b610-a47acf3defe7', 'f9e6113c-b9df-4a79-a8e9-39599dd703a6');
INSERT INTO "Message" ("id", "content", "status", "type", "agentId", "organizationId") VALUES ('8184b79c-468c-49f9-875d-696e56914dad', 'Por favor fornea mais detalhes sobre sua dvida.', 'enviado', 'vdeo', 'a5946d7b-3dd8-4b86-aa5a-134a439e1070', '698c003a-3f0e-4133-a8b8-acfae735995f');
INSERT INTO "Message" ("id", "content", "status", "type", "agentId", "organizationId") VALUES ('d3bf6edc-c880-4dbb-9646-c305892a0126', 'Ol como posso ajudar voc hoje', 'enviado', 'imagem', '8030f526-52c0-413a-9fa5-330dd7bb207c', '717a89c3-02a6-4e60-a684-42bedfa34e25');
INSERT INTO "Message" ("id", "content", "status", "type", "agentId", "organizationId") VALUES ('afedda7d-5065-4d4b-906f-25a1a4230595', 'Obrigado por entrar em contato conosco.', 'erro', 'vdeo', '7aed13d0-dbf0-485a-bdcd-461f55ee007a', 'd143bc47-8336-41c5-9820-9bb902cd66cd');
INSERT INTO "Message" ("id", "content", "status", "type", "agentId", "organizationId") VALUES ('88ae4f10-f833-472a-99f8-c509fdeed2f0', 'Por favor fornea mais detalhes sobre sua dvida.', 'enviado', 'documento', '8030f526-52c0-413a-9fa5-330dd7bb207c', '2bd8dd2c-e198-44a0-ab7f-adc629efbcc4');
INSERT INTO "Message" ("id", "content", "status", "type", "agentId", "organizationId") VALUES ('ad7fba20-db24-4aa7-a33f-fc17013d23ce', 'Por favor fornea mais detalhes sobre sua dvida.', 'pendente', 'udio', '7ad9b827-508d-46a6-b610-a47acf3defe7', 'd143bc47-8336-41c5-9820-9bb902cd66cd');
INSERT INTO "Message" ("id", "content", "status", "type", "agentId", "organizationId") VALUES ('be1c8d23-ac06-44d7-9847-9f4b0d6a8395', 'Ol como posso ajudar voc hoje', 'pendente', 'udio', '7aed13d0-dbf0-485a-bdcd-461f55ee007a', '0582f1c2-c80c-4049-9c65-dff5f029fc28');

INSERT INTO "Subscription" ("id", "plan", "status", "organizationId") VALUES ('dd3680ff-3a1b-46a4-82a9-0a6c7db83be2', 'Starter', 'inactive', '698c003a-3f0e-4133-a8b8-acfae735995f');
INSERT INTO "Subscription" ("id", "plan", "status", "organizationId") VALUES ('3626812c-65e6-4610-a716-f92fd30d27d3', 'Starter', 'pending', '0582f1c2-c80c-4049-9c65-dff5f029fc28');
INSERT INTO "Subscription" ("id", "plan", "status", "organizationId") VALUES ('28440cf8-1450-4358-a2fb-cdb8513e32ff', 'Professional', 'inactive', '698c003a-3f0e-4133-a8b8-acfae735995f');
INSERT INTO "Subscription" ("id", "plan", "status", "organizationId") VALUES ('1671d422-96d9-424e-8b5f-bec523408637', 'Enterprise', 'canceled', 'f9e6113c-b9df-4a79-a8e9-39599dd703a6');
INSERT INTO "Subscription" ("id", "plan", "status", "organizationId") VALUES ('16b33bf3-7056-4479-9c10-60a7af300dd5', 'Enterprise', 'active', 'f9e6113c-b9df-4a79-a8e9-39599dd703a6');
INSERT INTO "Subscription" ("id", "plan", "status", "organizationId") VALUES ('ce34a306-d94c-4ee2-bc4c-dd38f7452f0d', 'Professional', 'canceled', '8121000e-d69d-4a9d-abe2-7153d046085f');
INSERT INTO "Subscription" ("id", "plan", "status", "organizationId") VALUES ('2cf8d51e-93e9-44c9-8dc3-b9637791c814', 'Professional', 'active', '8121000e-d69d-4a9d-abe2-7153d046085f');
INSERT INTO "Subscription" ("id", "plan", "status", "organizationId") VALUES ('98cb281d-b6d3-4539-976a-8e1bdcca189f', 'Professional', 'inactive', '698c003a-3f0e-4133-a8b8-acfae735995f');
INSERT INTO "Subscription" ("id", "plan", "status", "organizationId") VALUES ('226ee8e9-8cf8-40f6-bc58-d3f6f9df3230', 'Enterprise', 'canceled', 'd143bc47-8336-41c5-9820-9bb902cd66cd');
INSERT INTO "Subscription" ("id", "plan", "status", "organizationId") VALUES ('0e69b805-aef1-4843-9452-ca3b179850c2', 'Starter', 'pending', '2bd8dd2c-e198-44a0-ab7f-adc629efbcc4');

INSERT INTO "Payment" ("id", "amount", "status", "method", "subscriptionId", "organizationId") VALUES ('880a91c6-dc03-4e03-8026-c9331110dc65', '199.00', 'processing', 'credit card', 'ce34a306-d94c-4ee2-bc4c-dd38f7452f0d', 'ac1a8724-fd7a-4bdf-a674-7c66f259ae23');
INSERT INTO "Payment" ("id", "amount", "status", "method", "subscriptionId", "organizationId") VALUES ('6cfb3296-84b7-4be5-a1b3-725b95d0978d', '149.50', 'failed', 'pix', '0e69b805-aef1-4843-9452-ca3b179850c2', '0582f1c2-c80c-4049-9c65-dff5f029fc28');
INSERT INTO "Payment" ("id", "amount", "status", "method", "subscriptionId", "organizationId") VALUES ('2126aa4c-2802-4c1d-bee1-cecc73c69170', '199.00', 'pending', 'credit card', 'ce34a306-d94c-4ee2-bc4c-dd38f7452f0d', '698c003a-3f0e-4133-a8b8-acfae735995f');
INSERT INTO "Payment" ("id", "amount", "status", "method", "subscriptionId", "organizationId") VALUES ('c077a3ce-284d-4a1d-a5d3-a8caba2a0ff7', '0.00', 'processing', 'stripe', 'dd3680ff-3a1b-46a4-82a9-0a6c7db83be2', '717a89c3-02a6-4e60-a684-42bedfa34e25');
INSERT INTO "Payment" ("id", "amount", "status", "method", "subscriptionId", "organizationId") VALUES ('0e1af9d8-d1ef-4903-9a5c-926d44c49ae2', '0.00', 'pending', 'paypal', '16b33bf3-7056-4479-9c10-60a7af300dd5', '0582f1c2-c80c-4049-9c65-dff5f029fc28');
INSERT INTO "Payment" ("id", "amount", "status", "method", "subscriptionId", "organizationId") VALUES ('6ed87db7-6201-469e-8c03-c84938d0ed52', '49.00', 'refunded', 'pix', 'ce34a306-d94c-4ee2-bc4c-dd38f7452f0d', '717a89c3-02a6-4e60-a684-42bedfa34e25');
INSERT INTO "Payment" ("id", "amount", "status", "method", "subscriptionId", "organizationId") VALUES ('bbaeffe8-2af9-473d-b3a3-a564496002ed', '49.00', 'completed', 'bank transfer', '2cf8d51e-93e9-44c9-8dc3-b9637791c814', '507fea9d-913f-4b5a-a1ad-19ee073c95a6');
INSERT INTO "Payment" ("id", "amount", "status", "method", "subscriptionId", "organizationId") VALUES ('bcb46cf8-5d2f-4041-83b4-706320341234', '0.00', 'pending', 'credit card', '16b33bf3-7056-4479-9c10-60a7af300dd5', 'd143bc47-8336-41c5-9820-9bb902cd66cd');
INSERT INTO "Payment" ("id", "amount", "status", "method", "subscriptionId", "organizationId") VALUES ('35102077-80f8-4278-8e35-7dd81bc762ab', '199.00', 'refunded', 'pix', '16b33bf3-7056-4479-9c10-60a7af300dd5', '507fea9d-913f-4b5a-a1ad-19ee073c95a6');
INSERT INTO "Payment" ("id", "amount", "status", "method", "subscriptionId", "organizationId") VALUES ('5f368891-3584-42c4-8bcb-313dab365898', '99.99', 'failed', 'credit card', 'ce34a306-d94c-4ee2-bc4c-dd38f7452f0d', '2bd8dd2c-e198-44a0-ab7f-adc629efbcc4');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
