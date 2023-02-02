var util1 = new Utils({pKey:'pKey',docxpressoInstallation:'docxpressoInstallation'});

util1.setOptions()

util1.apikey_control('ddssfd','abdc','abcd');

console.log(util1.base64_encode_url_safe('abcdefg'));

console.log(util1.base64_decode_url_safe('YWJjZGVmZw,,'));

console.log(util1.previewDocument({template:5}));

console.log(util1.validateDocument({template:'404',token:'c30d3cf6321e34b1fc27405bb5e5f0b0'}));

console.log(util1.sendEditLinkByEmail({template:287,token:'c37f59f1f074a03258015d6b2125db23'},{}));

console.log(util1.validationsByTemplate({id:474}));

console.log(util1.viewDocument({template: '287', token: 'c30d3cf6321e34b1fc27405bb5e5f0b0'}));

console.log(util1.viewHistoryDocument({template: '287', token: 'c30d3cf6321e34b1fc27405bb5e5f0b0'}));

console.log(util1.regenerateDocument({id: '465', token: '5f41c4c2d7d1c775e42a734324b85b88'}));

console.log(util1.requestDocument({template:253, token:'e58b6ff56d20c7ca6eb2bb5b5dbb4706'}));

console.log(util1.revisionsByTemplate({id: 686}));

console.log(util1.downloadAttachment({usageId: 7696}));

console.log(util1.downloadDocument({id: 445, token: '2750daad744b669dcc6910f5a32fac40'}));

console.log(util1.fetchForwardedDocument({id: 5}));

console.log(util1.getAnnexData('ad0c670a9d1f9dcb1648a737e96805e5'));

console.log(util1.getTemplateData(5));

console.log(util1.getTemplateThumbnail(5));

console.log(util1.getTemplateSignatureData(5));

console.log(util1.modifyTemplateData({id:5}));

console.log(util1.accessByTokenAction({email: 'tesgit@docxpresso.com', url: '/'}));

console.log(util1.createUser({username: 'Eduardo123', email:'gmail@gmail.com', password:'pasword123', name:'Eduardo', role:'user'}));

console.log(util1.createWorkflow({template:404,token:'c30d3cf6321e34b1fc27405bb5e5f0b0', steps:{}}));

console.log(util1.getWorkflowData(5));

console.log(util1.listCategories());

console.log(util1.documentsByCategory(6));

console.log(util1.modifyPassword('gmail@gmail.com', 'password'));
console.log(util1.modifySignatureProvider());
console.log(util1.documentTree());
console.log(util1.categoryTree());
console.log(util1.templatesByName());
console.log(util1.latestTemplates());
console.log(util1.searchTemplatesByTag({}));
console.log(util1.listTemplatesPaginated(1));
console.log(util1.lastUsages());
console.log(util1.lastUsedTemplates());
console.log(util1.dataByTemplate({id:5}));
console.log(util1.dataByTemplatePaginated(1,{id:168}));
console.log(util1.getUsageDataPaginated(1,{}));
console.log(util1.dataByUsage(324));

console.log(util1.dataDigestByUsage({id:695, format: 'csv'}));//En PHP no funciona

console.log(util1.forwardedDocumentsByTemplate({id:5}));

console.log(util1.modifyUsageData(7696 ,{token: '79f89f0a91b101bc38ff5f0d05c38916'}));

console.log(util1.documentAndDataByUsage(7696));

console.log(util1.dataStatistics());

console.log(util1.usageCount());

console.log(util1.userList());

console.log(util1.checkUser());

console.log(util1.cloneTemplate(5));

console.log(util1.createTemplate({})); 

console.log(util1.uploadTemplate(445));

console.log(util1.managePendingWebhooks());

console.log(util1.checkServiceToken());
