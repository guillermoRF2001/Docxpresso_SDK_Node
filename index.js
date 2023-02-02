

/**
 * Docxpresso SERVER SDK
 *
 * @copyright  Copyright (c) 2017 No-nonsense Labs (http://www.nononsenselabs.com)
 * @license    MIT
 * @link       https://opensource.org/licenses/MIT
 * @version    5.0
 * @since      1.0
 */

class Utils
{

    /**
     * Construct
     *
     * @param array options with the following keys and values
     *      'pKey' => (string) the private key of your Docxpresso SERVER 
     *       installation
     *      'docxpressoInstallation' => (string) the URL of your Docxpresso
     *      SERVER installation
     * 
     * @access public
     */

    constructor(options = array()){
        this._options = options
    }

    /**
     * Setter for options
     * @param array options with the following keys and values
     *      'pKey' => (string) the private key of your Docxpresso SERVER 
     *       installation
     *      'docxpressoInstallation' => (string) the URL of your Docxpresso
     *      SERVER installation
     * 
     * @access public
     */

     setOptions(options = this._options)
    {
        this._options = options;
        //console.log(this);
        return this;
    }

    /**
     * Checks the validity of an API key
     * 
     * @param string key the key you wish to validate
     * @param string data the string that was used to generate the key
     * @param string pKey the private key used to generate the hash
     * @return boolean
     * @access public
     */

    apikey_control(key, data, pKey)
    {
        var resultbin = require('crypto')
        .createHmac('sha1', pKey)
        .update(data)
        .digest('hex');
        //console.log(resultbin);
        

        if (key == resultbin) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Encodes in base64 url safe
     * 
     * @param string str
     * @return string
     * @access public
     */
     base64_encode_url_safe(str)
     {
        const encoded = Buffer.from(str, 'utf8').toString('base64');
        return encoded.replace(/\+/g,'-').replace(/\//,'_').replace(/\=/g,',');
     }

     /**
     * Decodes base64 url safe
     * 
     * @param string str
     * @return string
     * @access public
     */
     base64_decode_url_safe(str)
    {
        str = str.replace(/\-/g,'+').replace(/\_/,'/').replace(/\,/g,'=');
        return Buffer.from(str, 'base64').toString('utf8'); 
    }

    /**
     * Generates a one time link to preview a document in the associated
     * Docxpresso SERVER interface
     * 
     * NOTE: if data is loaded from various sources it will be loaded with the 
     * folllowing priority: varData, requestDataURI, token
     * 
     * @param array $data with the following keys and values
     *      'template' => (int) the id of the requested document template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'token' => (string) a unique identifier of a previous use. If given
     *       the data associated with the token will be preloaded into 
     *       the document.
     *      'identifier' => (string) optional var name that we may pass to help 
     *       identify that particular usage. Default value is an empty string 
     *      'reference' => (string) an optional string we may pass to help 
     *       identify that particular usage. Default value is an empty string
     *      'expires' => (integer) the number of seconds after which the link
     *       is no longer valid. 
     *      'custom' => (string) an optional string we may pass to add external
     *       additional info to the template
     *      'form' => (boolean) if true Docxpresso will serve a web form rather
     *       than an interactive document. Default value is false.
     *      'format' => (string) the requested document output format. The
     *       possible values include odt, pdf, doc, docx and rtf. If not given
     *       the available formats will be taken from the template settings.
     *      'enduserid' => (string) a value that will help us later to identify
     *       the user that requested the document. Default value is an empty 
     *       string.
     *      'email' => (string) the email of the user to send additional
     *       notifications. 
     *      'requestConfigURI' => (string) the URL where Docxpresso should fetch
     *       external configuration adjustments.
     *      'requestDataURI' => (string) the URL where Docxpresso should fetch
     *       external data. Default value is an empty string.
     *      'requestExternalCSS' => (string) the URL where Docxpresso should
     *       fetch for some external CSS file.
     *      'requestExternalJS' => (string) the URL where Docxpresso should
     *       fetch for some external JS file.
     *      'responseDataURI' => (string) the URL where Docxpresso should
     *       forward the user data. Default value is an empty string.
     *      'processingDataURI' => (string) the URL where Docxpresso should
     *       postprocess doc data. Default value is an empty string.
     *      'responseURL' => (string) the URL where Docxpresso should redirect
     *       the end user after saving the data. Default value is an empty 
     *       string. 
     *      'documentName' => (string) the name we want to give to the generated
     *       document. Default value is empty and in that case Docxpresso
     *       will use the default template name. 
     *       string.
     *      'domain' => (string) the URL doing the request. Default value is an 
     *       empty string.
     *      'prefix' => (string) a prefix that will limit enduser edition to
     *       only the field variables that start by that prefix. You can use
     *       a comma separated list to select more than one prefix. Default value 
     *       is an empty string.
     *      'editableVars' => (string) a comma separated list of var names
     *       to restrict the edition to that set. Default value is an empty 
     *       string.
     *      'blockVars' => (string) a comma separated list of var names
     *       which edition is expicitly blocked. Default value is an empty 
     *       string.
     *      'enforceValidation' => (boolean) if true the user will not be able
     *       to send data until all variable fields are validated. Default value
     *       is false.
     *      'language' => (string) if set will change the default interface
     *       language. Currently available values are: default, en, es
     *      'GDPR' => (boolean) if true the end user will be prompted to check
     *       the privacy policy (it only applies if it is also globally defined)
     *      'phone' => (string) with standard international format +12121112222.
     *       If given the end user will be first prompted to introduce an OTP
     *       sent to that phone.
     *      'OTPmessage' => (string) this only applies if we use a phone to
     *       request an OTP
     *      'varData' => additional JSON data we would like to preload into the 
     *       document
     *      'continueLink' => (boolean) if true the end user will be prompted
     *       to introduce an email where he can continue later the edition
     *      'continueLinkEmail' => if continueLink is set to true and this 
     *       option is given it will be shown as the default email to receive
     *       the continue link.
     *      'blockDocument' => (int) if equals "1" the end user will be asked if
     *       the document should be blocked from further edition, else if equals
     *       "2" the document wil be automatically blocked after first use and 
     *       finally if it equals "3" the document will be automatically blocked
     *       only if the end user is not a registered backoffice user.
     *      'history' => (boolean) if true and there is a token (or history data
     *       is provided from external sources) the user will be able to
     *       visualize the edition history of the document.
     *      'keepAlive' => (boolean) if true the generated link is alived and
     *       allows for multiple editions of the same document.
     *      'trackID' => (string) if given it will be used whenever the 
     *       keepAlive is set to true, otherwise it will be autogenerated.
     *      'loadContactData' => (integer) id of the contact whose data we want
     *       to load into the template.
     *      'requestVars' => (array) list of variables that should be sent in
     *       the query parameter of the responseURL
     *      'plugin' => (boolean) if true the petition may directly come from
     *       a plugin user so further security checks may be carried out to test
     *       for data coherence and permissions.
     *      'enableRejection' => (boolean) if true the user will be offered a
     *       button to directly 'reject' the document wuithout fulfilling it.
     *      'livePreview' => (boolean) this property only applies to web forms, 
     *       if true a live preview of the generated document will be offered.
     *      'client' => (integer) cliend id. Only for multi tenant instances. 
     *      'tabDisplay' => (string) if "full" the tabs will be forced to be
     *       fully displayed even if there are more than 5. default value is 
     *       "auto".
     * @return string
     * @access public
     */
    previewDocument(data)
    {     
        if (!this.empty(data.phone)){
            var url = this._options['docxpressoInstallation'] + '/tracking/OTP/request_OTP/' + data['template'];
        } else if(!this.empty(data['form']) && data['form']){
            url = this._options['docxpressoInstallation'] + '/documents/previewForm/' + data['template'];
        } else {
            url = this._options['docxpressoInstallation'] + '/documents/preview/' + data['template'];
        }
        var options = {};
        if(!this.empty(data['form']) && data['form']){
            options.display = 'form';
        }else {
            options.display = 'document';
        }
        if (!this.empty(data['phone'])){
            options.phone = data['phone'];
            options.action = 'preview';
        }
        if (!this.empty(data['OTPmessage'])){
            options.OTPmessage = encodeURIComponent(data['OTPmessage']);
        }
        if (this.isset(data['token'])) {
            options.token = data['token'];
        }
        if (this.isset(data['format'])) {
            options.forceFormat = data['format'];
        } 
        if (this.isset(data['enduserid'])) {
            options.enduserid = data['enduserid'];
        } 
        if (this.isset(data['email'])) {
            options.email = data['email'];
        } 
        //notice that if continueLink is given the enduserid will be overwritten
        if (this.isset(data['continueLink']) && data['continueLink']) {
            options.access = 'authenticated';
            options.enduserid = this._generateOTP();
        }
        if (this.isset(data['continueLinkEmail'])) {
            //notice that this will overwrite the email parameter if given
            options.email = data['continueLinkEmail'];
        }
        if (this.isset(data['identifier'])) {
            options.identifier = data['identifier'];
        }
        if (!this.empty(data['client'])) {
            options.client = data['client'];
        }
        if (this.isset(data['expires'])) {
            options.expires = data['expires'];
        }
        if (this.isset(data['reference'])) {
            options.reference = data['reference'];
        }
        if (this.isset(data['custom'])) {
            options.custom = data['custom'];
        }
        if (!this.empty(data['requestConfigURI'])) {
            var dURI = {};
            dURI.URL = data['requestConfigURI'];
            options.requestConfigURI = JSON.stringify(dURI);
        }
        if (!this.empty(data['requestDataURI'])) {
            dURI = {};
            dURI.URL = data['requestDataURI'];
            dURI.requestData = 'preview';
            options.requestDataURI = JSON.stringify(dURI);
        }
        if (this.isset(data['requestExternalJS'])) {
            options.requestExternalJS = data['requestExternalJS'];
        }
        if (this.isset(data['requestExternalCSS'])) {
            options.requestExternalCSS = data['requestExternalCSS'];
        }
        if (!this.empty(data['responseDataURI'])) {
            options.responseDataURI = data['responseDataURI'];
        }
        if (!this.empty(data['processingDataURI'])) {
            options.processingDataURI = data['processingDataURI'];
        }
        if (!this.empty(data['responseURL'])) {
            options.responseURL = data['responseURL'];
        }
        if (!this.empty(data['documentName'])) {
            options.documentName = data['documentName'];
        }
        if (!this.empty(data['domain'])) {
            options.domain = data['domain'];
        }
        if (!this.empty(data['prefix'])) {
            options.prefix = data['prefix'];
        } 
        if (!this.empty(data['editableVars'])) {
            options.editableVars = data['editableVars'];
        } 
        if (!this.empty(data['blockVars'])) {
            options.blockVars = data['blockVars'];
        } 
        if (!this.empty(data['enforceValidation'])) {
            options.enforceValidation = true;
        }
        if (!this.empty(data['GDPR'])) {
            options.GDPR = true;
        }
        if (!this.empty(data['livePreview'])) {
            options.viewDoc = true;
        }
        if (!this.empty(data['language'])) {
            options.locale = data['language'];
        }
        if (this.isset(data['varData'])) {
            options.data = data['varData'];
        }
        if (!this.empty(data['history'])) {
            options.history = 1;
        }
        if (!this.empty(data['blockDocument'])) {
            options.blockDocument = data['blockDocument'];
        }
        if (!this.empty(data['keepAlive'])) {
            options.keepAlive = 1;
            //we should also generate a trackID to be able to keep track
            //of consequent editions
            if (!this.empty(data['trackID'])){
                options.trackID = data['trackID'];
            } else {
                var preseed = this.generate_uniqid()+ data['template'] + this.generate_uniqid();
                var salt = 'd2g6IOP(U(&Â§)%UÂ§VUIPU(HN%V/Â§Â§URerjh0Ã¼rfqw4zoÃ¶qe54gÃŸ0Ã¤Q"LOU$3wer'
                var crypto = require('crypto')
                var prehash = crypto.createHash('sha1')
                .update(JSON.stringify(preseed))
                .digest('hex');
                var trackID = crypto.createHash('md5').update(salt + prehash).digest("hex");
                options.trackID = trackID;
            }
        }
        if (!this.empty(data['loadContactData']) && Number.isInteger(data['loadContactData']) && data['loadContactData'] > 0){
            options.preloadDXData = 1;
            options.DXData = {};
            options.DXData.type = "contact";
            options.DXData.contact = data['loadContactData'];
        }
        if (this.isset(data['requestVars']) && count(data['requestVars']) > 0) {
            options.requestVars = implode(',', data['requestVars']);
        }
        if (!this.empty(data['plugin'])) {
            options.plugin = 1;
        }
        if (!this.empty(data['enableRejection'])) {
            options.enableRejection = 1;
        }
        if (!this.empty(data['tabDisplay'])) {
            options.tabDisplay = data['tabDisplay'];
        }
        var opt = this.base64_encode_url_safe(JSON.stringify(options));
        
        return this._returnLink(url, data['template'], opt);    
    }

    /**
     * Generates a one time link to validate a document in the associated
     * Docxpresso SERVER interface
     * 
     * @param array $data with the following keys and values
     *      'template' => (int) the id of the requested document template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'token' => (string) a unique identifier of a previous use. This 
     *       value is complusory and must correspond to a valid usage token.
     *      'requestDataURI' => (string) the URL where Docxpresso should fetch
     *       external data. Default value is an empty string.
     *      'varData' => additional JSON data we would like to preload into the 
     *       document
     *      'name' => (string) the name of the user that wll validate the 
     *       document.
     *      'email' => (string) the email of the user that wll validate the 
     *       document.
     *      'phone' => (string) with standard international format +12121112222.
     *       If given the end user will be first prompted to introduce an OTP
     *       sent to that phone. If the value is set as "request" the user will 
     *       be prompted to introduce his phone in the validation interface.
     *      'OTPmessage' => (string) this only applies if we use a phone to
     *       request an OTP
     *      'custom' => (string) an optional string we may pass to add external
     *       additional info to the validation process.
     *      'language' => (string) if set will change the default interface
     *       language. Currently available values are: default, en, es.
     *      'responseDataURI' => (string) the URL where Docxpresso should
     *       forward the user data. Default value is an empty string.
     *      'responseURL' => (string) the URL where Docxpresso should redirect
     *       the end user after validating the data. Default value is an empty 
     *       string.
     *      
     * @return string
     * @access public
     */
    validateDocument(data)
    {     
        var url = this._options['docxpressoInstallation'] + '/documents/validate/preview/';
        url += data['template'] + '/' + data['token'];
        var options = {};
        if (this.isset(data['name'])) {
            options.name = data['name'];
        }
        if (this.isset(data['email'])) {
            options.email = data['email'];
        }
        if (!this.empty(data['phone'])){
            options.phone = data['phone'];
        }
        if (!this.empty(data['OTPmessage'])){
            options.OTPmessage = rawurlencode(data['OTPmessage']);
        }
        if (this.isset(data['custom'])) {
            options.custom = data['custom'];
        }
        if (this.isset(data['responseURL'])) {
            options.responseURL = data['responseURL'];
        }
        if (!this.empty(data['responseDataURI'])) {
            options.responseDataURI = data['responseDataURI'];
        }
        if (!this.empty(data['requestDataURI'])) {
            dURI = {};
            dURI.URL = data['requestDataURI'];
            dURI.requestData = 'validate';
            options.requestDataURI = JSON.stringify(dURI);
        }
        if (this.isset(data['varData'])) {
            options.data = data['varData'];
        }
        if (!this.empty(data['language'])) {
            options.locale = data['language'];
        }
        
        var opt = this.base64_encode_url_safe(JSON.stringify(options));
        //console.log(opt);
        //in this case we need to concatenate id and token so the apikey
        //can not be reused for methods that allowed to use twice the
        //apikey
        var id = data['template'] + data['token'];
        //console.log(id);
        return this._returnLink(url, id, opt);    
    }

    /**
     * Generates a one time link to preview a document in the associated
     * Docxpresso SERVER interface and sends it by email to the end user
     * 
     * NOTE: if data is loaded from various sources it will be loaded with the 
     * folllowing priority: varData, requestDataURI, token
     * 
     * @param array $data with the following keys and values
     *      'template' => (int) the id of the requested document template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'token' => (string) a unique identifier of a previous use. If given
     *       the data associated with the token will be preloaded into 
     *       the document.
     *      'identifier' => (string) optional var name that we may pass to help 
     *       identify that particular usage. Default value is an empty string 
     *      'reference' => (string) an optional string we may pass to help 
     *       identify that particular usage. Default value is an empty string
     *      'expires' => (integer) the number of seconds after which the link
     *       is no longer valid. 
     *      'custom' => (string) an optional string we may pass to add external
     *       additional info to the template
     *      'form' => (boolean) if true Docxpresso will serve a web form rather
     *       than an interactive document. Default value is false.
     *      'format' => (string) the requested document output format. The
     *       possible values include odt, pdf, doc, docx and rtf. If not given
     *       the available formats will be taken from the template settings.
     *      'enduserid' => (string) a value that will help us later to identify
     *       the user that requested the document. Default value is an empty 
     *       string.
     *      'email' => (string) the email of the user to send additional
     *       notifications. 
     *      'requestConfigURI' => (string) the URL where Docxpresso should fetch
     *       external configuration adjustments.
     *      'requestDataURI' => (string) the URL where Docxpresso should fetch
     *       external data. Default value is an empty string.
     *      'requestExternalCSS' => (string) the URL where Docxpresso should
     *       fetch for some external CSS file.
     *      'requestExternalJS' => (string) the URL where Docxpresso should
     *       fetch for some external JS file.
     *      'responseDataURI' => (string) the URL where Docxpresso should
     *       forward the user data. Default value is an empty string.
     *      'processingDataURI' => (string) the URL where Docxpresso should
     *       postprocess doc data. Default value is an empty string.
     *      'responseURL' => (string) the URL where Docxpresso should redirect
     *       the end user after saving the data. Default value is an empty 
     *       string. 
     *      'documentName' => (string) the name we want to give to the generated
     *       document. Default value is empty and in that case Docxpresso
     *       will use the default template name. 
     *       string.
     *      'domain' => (string) the URL doing the request. Default value is an 
     *       empty string.
     *      'prefix' => (string) a prefix that will limit enduser edition to
     *       only the field variables that start by that prefix. You can use
     *       a comma separated list to select more than one prefix. Default value 
     *       is an empty string.
     *      'editableVars' => (string) a comma separated list of var names
     *       to restrict the edition to that set. Default value is an empty 
     *       string.
     *      'blockVars' => (string) a comma separated list of var names
     *       which edition is expicitly blocked. Default value is an empty 
     *       string.
     *      'enforceValidation' => (boolean) if true the user will not be able
     *       to send data until all variable fields are validated. Default value
     *       is false.
     *      'language' => (string) if set will change the default interface
     *       language. Currently available values are: default, en, es
     *      'GDPR' => (boolean) if true the end user will be prompted to check
     *       the privacy policy (it only applies if it is also globally defined)
     *      'phone' => (string) with standard international format +12121112222.
     *       If given the end user will be first prompted to introduce an OTP
     *       sent to that phone.
     *      'OTPmessage' => (string) this only applies if we use a phone to
     *       request an OTP
     *      'varData' => additional JSON data we would like to preload into the 
     *       document
     *      'continueLink' => (boolean) if true the end user will be prompted
     *       to introduce an email where he can continue later the edition
     *      'continueLinkEmail' => if continueLink is set to true and this 
     *       option is given it will be shown as the default email to receive
     *       the continue link.
     *      'blockDocument' => (boolean) if true the end user will be asked if
     *       the document should be blocked from further edition.
     *      'history' => (boolean) if true and there is a token (or history data
     *       is provided from external sources) the user will be able to
     *       visualize the edition history of the document.
     *      'keepAlive' => (boolean) if true the generated link is alived and
     *       allows for multiple editions of the same document.
     *      'trackID' => (string) if given it will be used whenever the 
     *       keepAlive is set to true, otherwise it will be autogenerated.
     *      'loadContactData' => (integer) id of the contact whose data we want
     *       to load into the template.
     *      'requestVars' => (array) list of variables that should be sent in
     *       the query parameter of the responseURL
     *      'plugin' => (boolean) if true the petition may directly come from
     *       a plugin user so further security checks may be carried out to test
     *       for data coherence and permissions.
     *      'enableRejection' => (boolean) if true the user will be offered a
     *       button to directly 'reject' the document wuithout fulfilling it.
     *      'livePreview' => (boolean) this property only applies to web forms, 
     *       if true a live preview of the generated document will be offered.
     *      'client' => (integer) cliend id. Only for multi tenant instances.
     * @param array $mailer with the following keys and values
     *      'email' => (string) the email address where to send the edition link
     *      'logo' => (string) URL where to fetch the logo. If not given the 
     *       default Docxpresso instance logo will be used
     *      'subject' => (string) email subject. If not given the template title
     *       will be used
     *      'body' => (string) HTML text. If not given the template description
     *       will be used.
     *      'callToAction' => (string) text of the link button. If not given
     *       the default text will be used.
     *      'emailTemplate' => (string) path to the required email template. 
     *       If not given the default template will be used.
     *      'footer' => (string) HTML text. If not given the default footer
     *       will be used.
     * 
     * @return string
     * @access public
     */
    sendEditLinkByEmail(data, mailer)
    { 
        var link = this.previewDocument(data);
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/send_email_edit/' + data['template'];
        var options = {};
        options.link = link;
        if (this.isset(mailer['email'])) {
            options.email = mailer['email'];
        }
        if (this.isset(mailer['logo'])) {
            options.logo = mailer['logo'];
        }
        if (!this.empty(mailer['subject'])){
            options.subject = mailer['subject'];
        }
        if (!this.empty(mailer['body'])){
            options.body = mailer['body'];
        }
        if (this.isset(mailer['callToAction'])) {
            options.callToAction = mailer['callToAction'];
        }
        if (this.isset(mailer['emailTemplate'])) {
            options.emailTemplate = mailer['emailTemplate'];
        }
        if (this.isset(mailer['footer'])) {
            options.footer = mailer['footer'];
        }

        var opt = this.base64_encode_url_safe(JSON.stringify(options));
        return this._returnLink(url, data['template'], opt);
    }

    /**
     * Returns a link to download all document validations in JSON(P)  
     * format  for a given template id from the associated Docxpresso 
     * SERVER installation
     * 
     * @param array $data with the following keys and values
     *      'id' => (int) the id of the template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'status' => (boolean) if true only acepted documents will be listed
     *       and if false only rejected documents will be listed. Default value
     *       is empty
     *      'enduserid' => (string) the end user id of a particular revision.
     *       Default value is empty.
     *      'period' => (string) if given will overwrite the given startDate and
     *       enddate parameters. The possible values are: today, 
     *       1week (last week), 1month (last month), 3month (last quarter),
     *       year (last year). The default value is empty
     *      'startDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened after it. Default value is an empty 
     *       string.
     *      'endDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened before it. Default value is an empty 
     *       string.
     *      'firstResult' => (int) query offset. Default value is 0; 
     *      'maxResults' => (int) maximum number of results. Beware that
     *       each installation may have its own limits to this number
     *      (usually 100)
     *       Default value is empty and Docxpresso default will be used.
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    validationsByTemplate(data, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/validations_by_template/' + data['id'];
		
        if (!this.empty(callback)) {
                url += '/' + callback;
        }

        //we build and options object with the search filters
        var options = {};
        if (this.isset(data['status']) && data['status']) {
            options.status = 1;
        } else if (this.isset(data['status']) && !data['status']) {
            options.status = 0;
        } else {
            options.status = 2;
        }
        if (!this.empty(data['enduserid'])) {
            options.enduserid = data['enduserid'];
        }
        //dates must be in the format 2016-01-30
        if (!this.empty(data['startDate'])) {
            options.startDate = data['startDate'];
        }
        if (!this.empty(data['endDate'])) {
            options.endDate = data['endDate'];
        }
        if (!this.empty(data['period'])) {
            options.period = data['period'];
        }
        if (!this.empty(data['firstResult'])) {
            options.firstResult = data['firstResult'];
        }
        if (!this.empty(data['maxResults'])) {
            options.maxResults = data['maxResults'];
        }
        if (!this.empty(data['sort'])) {
            options.sort = data['sort'];
        }
        if (!this.empty(data['order'])) {
            options.order = data['order'];
        }

        var opt = this.base64_encode_url_safe(JSON.stringify(options));
		
        return this._returnLink(url, data['id'], opt);
    }

    /**
     * Generates a one time link to simply view a document within the
     * Docxpresso interface with no action associated
     * 
     * @param array $data with the following keys and values
     *      'template' => (int) the id of the requested document template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'token' => (string) a unique identifier of a previous use. This 
     *       value must correspond to a valid usage token.
     *      'requestDataURI' => (string) the URL where Docxpresso should fetch
     *       external data. Default value is an empty string.
     *      'varData' => the JSON data we would like to use to generate the 
     *       document.
     *      'language' => (string) if set will change the default interface
     *       language. Currently available values are: default, en, es.
     *      'toolBar' => (boolean) if false the fixed bar at the top will be 
     *       removed.
     *      'permanent' => (boolean) if set the link will never expire. Default 
     *       value is false.
     *      'history' => (boolean) if true the user will be able to
     *       visualize the edition history of the document.
     *      
     * @return string
     * @access public
     */
    viewDocument(data)
    {     
        if (this.empty(data['token'])){
            data['token'] = 0;
        }
        var url = this._options['docxpressoInstallation'] + '/documents/validate/view/';
        url += data['template'] + '/' + data['token'];
        var options = {};
        if (!this.empty(data['requestDataURI'])) {
            var dURI = {};
            dURI.URL = data['requestDataURI'];
            dURI.requestData = 'view';
            options.requestDataURI = JSON.stringify(dURI);
        }
        if (this.isset(data['varData'])) {
            options.data = data['varData'];
        } 
        if (!this.empty(data['language'])) {
            options.locale = data['language'];
        }
        if (this.isset(data['toolBar'])) {
            options.toolBar = data['toolBar'];
        }
        if (this.isset(data['permanent'])) {
            options.permanent = data['permanent'];
        }
        if (!this.empty(data['history'])) {
            options.history = 1;
        }
        var opt = this.base64_encode_url_safe(JSON.stringify(options));
        //in this case we need to concatenate id and token so the apikey
        //can not be reused for methods that allowed to use twice the
        //apikey
        var id = data['template'] + data['token'] + 'view';
        return this._returnLink(url, id, opt);    
    }

    /**
     * Generates a one time link to simply view a document history within the
     * Docxpresso interface with no action associated
     * 
     * @param array $data with the following keys and values
     *      'template' => (int) the id of the requested document template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'token' => (string) a unique identifier of a previous use. This 
     *       value must correspond to a valid usage token.
     *      'requestDataURI' => (string) the URL where Docxpresso should fetch
     *       external data with history data. Default value is an empty string.
     *       if given it will override the token.
     *      'varData' => the JSON data we would like to use to generate the 
     *       history associated with that document. If given will override the
     *       token and requestDataURI.
     *      'language' => (string) if set will change the default interface
     *       language. Currently available values are: default, en, es.
     *      
     * @return string
     * @access public
     */
    viewHistoryDocument(data)
    {     
        if (this.empty(data['token'])){
            data['token'] = 0;
        }
        var url = this._options['docxpressoInstallation'] + '/documents/history/view/';
        url += data['template'] + '/' + data['token'];
        var options = {};
        if (!this.empty(data['requestDataURI'])) {
            dURI = {};
            dURI.URL = data['requestDataURI'];
            dURI.requestData = 'preview';
            options.requestDataURI = json_encode(dURI);
        }
        if (this.isset(data['varData'])) {
            options.data = data['varData'];
        } 
        if (!this.empty(data['language'])) {
            options.locale = data['language'];
        }
        
        var opt = this.base64_encode_url_safe(JSON.stringify(options));
        //in this case we need to concatenate id and token so the apikey
        //can not be reused for methods that allowed to use twice the
        //apikey
        var id = data['template'] + data['token'] + 'view';
        return this._returnLink(url, id, opt);    
    }

    /**
     * Generates a one time link to regenerate a "full· document package" in zip
     * format (document + attachments) from the associated
     * Docxpresso SERVER installation
     * 
     * @param array $data with the following keys and values
     *      'id' => (int) the id of the corresponding template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'token' => (string) the token of the requested usage.
     *      'identifier' => (string) if given the token will be ignored and
     *       the returned document will be the last document retrieved with that
     *       identifier.
     *      'onlyDocument' => (boolean) if true only downloads the main document
     *       ignoring any potential attachment. Default value false.
     *      'documentName' => (string) the name we want to give to the generated
     *       document (it should include the extensions: .odt, .pdf, .doc, 
     *       .doc(legacy), .docx or .rtf). The default values is document.odt
     * 
     * @return string
     * @access public
     */
    regenerateDocument(data)
    {    
        var url = this._options['docxpressoInstallation'] + '/documents/regenerateDocument/' + data['id'];

        var options = {};
        if (!this.empty(data['identifier'])){
            options.identifier = data['identifier'];
        } else {
            options.token = data['token'];
        }
        if (this.isset(data['onlyDocument'])){
            options.onlyDocument = data['onlyDocument'];
        }
        if (this.isset(data['documentName'])){
            options.documentName = data['documentName'];
        }
        var opt = this.base64_encode_url_safe(JSON.stringify(options));
       
        return this._returnLink(url, data['id'], opt);
    }

    /**
     * Generates a one time link to generate a document in the associated
     * Docxpresso SERVER interface
     * 
     * NOTE: if data is loaded from various sources it will be loaded with the 
     * folllowing priority: varData, requestDataURI, token
     * 
     * @param array $data with the following keys and values
     *      'template' => (int) the id of the requested document template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'identifier' => (string) optional var name that we may pass to help 
     *       identify that particular usage. Default value is an empty string 
     *      'reference' => (string) an optional string we may pass to help 
     *       identify that particular usage. Default value is an empty string
     *      'requestDataURI' => (string) the URL where Docxpresso should fetch
     *       external data. Default value is an empty string.
     *      'documentName' => (string) the name we want to give to the generated
     *       document (it should include the extensions: .odt, .pdf, .doc, 
     *       .doc(legacy), .docx or .rtf). The default value is document.odt
     *      'varData' => the JSON data we would like to use to generate the 
     *       document.
     *      'token' => (string) a unique identifier of a previous use. If given
     *       the data associated with the token will be preloaded into 
     *       the document.
     *      'display' => (string) it can be 'document' (default) or 'form'. 
     *       This is only used for the generation of continue links
     *      'response' => (string) it can be 'download'(default) if the document
     *       is to be directly downloadable from the browser or 'json' if we want
     *       to get the document as base64 encoded together with the usage id
     *       and token
     *      'callback' => it only spplies to json responses and sets the name
     *       of the callback function for JSONP responses.
     *      'client' => (integer) cliend id. Only for multi tenant instances. 
     * @return string
     * @access public
     */
    requestDocument(data)
    {    
        var url = this._options['docxpressoInstallation'] + '/documents/requestDocument/' + data['template'];
	
        var options = {};
        if (this.isset(data['documentName'])) {
            options.name = data['documentName'];
        } else {
            options.name = 'document.odt';
        }
        if (this.isset(data['varData'])) {
            options.data = data['varData'];
        } else {
            options.data = '{}';
        }
        if (this.isset(data['display'])) {
            options.display = data['display'];
        } else {
            options.display = 'document';
        }
        if (!this.empty(data['requestDataURI'])) {
            dURI = {};
            dURI.URL = data['requestDataURI'];
            dURI.requestData = 'request';
            options.requestDataURI = json_encode(dURI);
        }
        if (this.isset(data['token'])) {
            options.token = data['token'];
        }
        if (this.isset(data['identifier'])) {
            options.identifier = data['identifier'];
        }
        if (!this.empty(data['client'])) {
            options.client = data['client'];
        }
        if (this.isset(data['reference'])) {
            options.reference = data['reference'];
        }
        if (this.isset(data['response'])) {
            options.response = data['response'];
        }

        var opt = this.base64_encode_url_safe(JSON.stringify(options));
        
        return this._returnLink(url, data['template'], opt);    
    }

    /**
     * Generates a one time link to sign a document generated with Docxpresso
     * 
     * @param array $data $data with the following keys and values
     *      'usageId' => (int) the id of the corresponding usage.
     *       This value is compulsory and must correspond to a valid document
     *      'token' => (string) the token of the given usage for further
     *       security. 
     *      'provider' => (string) it can be vidSigner, Lleida.net or NodalBlock
     *      'signers' => (array) an array of arrays where the second array 
     *       includes the following key and values (some may be optional
     *       depending on the provider and how the signature is parametrized):
     *          'name': (string) signer's name
     *          'id': (string) signer's id
     *          'email': (string) signer's email
     *          'phone': (string) signer's phone
     *       
     * @return string
     * @access public
     */
    requestSignature(data)
    {
        //TO BE DONE
    }

    /**
     * Returns a link to download all document revisions in JSON(P)  
     * format  for a given template id from the associated Docxpresso 
     * SERVER installation
     * 
     * @param array $data with the following keys and values
     *      'id' => (int) the id of the template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'status' => (boolean) if true only acepted documents will be listed
     *       and if false only rejected documents will be listed. Default value
     *       is empty
     *      'enduserid' => (string) the end user id of a particular revision.
     *       Default value is empty.
     *      'period' => (string) if given will overwrite the given startDate and
     *       enddate parameters. The possible values are: today, 
     *       1week (last week), 1month (last month), 3month (last quarter),
     *       year (last year). The default value is empty
     *      'startDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened after it. Default value is an empty 
     *       string.
     *      'endDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened before it. Default value is an empty 
     *       string.
     *      'firstResult' => (int) query offset. Default value is 0; 
     *      'maxResults' => (int) maximum number of results. Beware that
     *       each installation may have its own limits to this number
     *      (usually 100)
     *       Default value is empty and Docxpresso default will be used.
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    revisionsByTemplate(data, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/revisions_by_template/' + data['id'];
		
        if (!this.empty(callback)) {
                url += '/' + callback;
        }

        //we build and options object with the search filters
        var options = {};
        if (this.isset(data['status']) && data['status']) {
            options.status = 1;
        } else if (this.isset(data['status']) && !data['status']) {
            options.status = 0;
        } else {
            options.status = 2;
        }
        if (!this.empty(data['enduserid'])) {
            options.enduserid = data['enduserid'];
        }
        //dates must be in the format 2016-01-30
        if (!this.empty(data['startDate'])) {
            options.startDate = data['startDate'];
        }
        if (!this.empty(data['endDate'])) {
            options.endDate = data['endDate'];
        }
        if (!this.empty(data['period'])) {
            options.period = data['period'];
        }
        if (!this.empty(data['firstResult'])) {
            options.firstResult = data['firstResult'];
        }
        if (!this.empty(data['maxResults'])) {
            options.maxResults = data['maxResults'];
        }
        if (!this.empty(data['sort'])) {
            options.sort = data['sort'];
        }
        if (!this.empty(data['order'])) {
            options.order = data['order'];
        }

        var opt = this.base64_encode_url_safe(JSON.stringify(options));
		
        return this._returnLink(url, data['id'], opt);
    }

    /**
     * Generates a one time link to download an attachment from the associated
     * Docxpresso SERVER installation
     * 
     * @param array $data $data with the following keys and values
     *      'usageId' => (int) the id of the corresponding usage.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'name' => (string) the name of the attachment file we want to
     *       download. It should correspond to the name given in the Docxpresso
     *       SERVER processing interface.
     *      'token' => (string) the token of the given usage for further
     *       security. 
     * @return string
     * @access public
     */
    downloadAttachment(data)
    {    
        var url = this._options['docxpressoInstallation'] + '/documents/getAttachment/' + data['usageId'];

        var uniqid = this.generate_uniqid();
        var timestamp = Math.floor(Date.now()/1000);

        var options = {};
        options.name = data['name'];
        options.token = data['token'];
	
        var opt = this.base64_encode_url_safe(JSON.stringify(options));
      
        return this._returnLink(url, data['usageId'], opt);     
    }

    /**
     * Generates a one time link to download a "full· document package" in zip
     * format (document + attachments) from the associated
     * Docxpresso SERVER installation
     * 
     * @param array $data $data with the following keys and values
     *      'id' => (int) the id of the corresponding template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'token' => (string) the token of the requested usage.
     *      'identifier' => (string) if given the token will be ignored and
     *       the returned docuemnt will be the last document retrieved with that
     *       identifier.
     *      'onlyDocument' => (boolean) if true only downloads the main document
     *       ignoring any potential attachment. Default value false.
     *       'plugin' => (boolean) if true the petition may directly come from
     *       a plugin user so further security checks may be carried out to test
     *       for data coherence and permissions.
     * 
     * @return string
     * @access public
     */
    downloadDocument(data)
    {    
        var url = this._options['docxpressoInstallation'] + '/documents/getFullDocumentation/' + data['id'];

        var options = {};
        if (!this.empty(data['identifier'])){
            options.identifier = data['identifier'];
        } else {
            options.token = data['token'];
        }
        if (this.isset(data['onlyDocument'])){
            options.onlyDocument = data['onlyDocument'];
        }
        if (!this.empty(data['plugin'])) {
            options.plugin = 1;
        }
        var opt = this.base64_encode_url_safe(JSON.stringify(options));
       
        return this._returnLink(url, data['id'], opt);
    }

    /**
     * Generates a one time link to get a JSON with all info associated with
     * a forwarded document including the document base64 encoded(it may be
     * a zip if the document has attachments) from the associated
     * Docxpresso SERVER installation
     * 
     * @param array $data $data with the following keys and values
     *      'id' => (int) the id of the corresponding forwarded document
     *      'processed' => (int) if given will set the processed flag this
     *      value. For example you may set its value to 1 in order to restrict
     *      future searches. 
     * @return string
     * @access public
     */
    fetchForwardedDocument(data)
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/fetch_forwarded_document/' + data['id'];
    
        var options = {};
        if (this.isset(data['processed'])){
            options.processed = data['processed'];
        }
        var opt = this.base64_encode_url_safe(JSON.stringify(options));
       
        return this._returnLink(url, data['id'], opt);
    }

    /**
     * Generates a one time link to get all annex document data: thumbnail, 
     * base64 encoded template odt file, etcetera.
     * 
     * @param integer $token the token of the requested annex
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    getAnnexData(token, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/get_annex/' + token;

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
		
        return this._returnLink(url);
    }

    /**
     * Generates a one time link to get all document template data: Docxpresso
     *  data, thumbnail, base64 encoded template odt file, etcetera.
     * 
     * @param integer $id the id of the required template
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    getTemplateData(id, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/get_template/' + id;

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
		
        return this._returnLink(url, id);
    }
   
    /**
     * Generates a one time link to get just a template thumbnail
     * 
     * @param integer $id the id of the required template
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    getTemplateThumbnail(id, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/get_thumbnail/' + id;

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
		
        return this._returnLink(url, id);
    }

    /**
     * Generates a one time link to get the signatures parametrization data
     * from the template
     * 
     * @param integer $id the id of the required template
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    getTemplateSignatureData(id, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/get_template_signature_data/' + id;

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
		
        return this._returnLink(url, id);
    }

    /**
     * Get current usage for administrative purposes
     * 
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return array
     * @access public
     */
    getUsageCurrent(callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/get_usage_current';

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
		
        return this._returnLink(url);
    }

    /**
     * Get usage history by year/month for administrative purposes
     * 
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    getUsageHistory(callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/get_usage_history';

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
		
        return this._returnLink(url);
    }

    /**
     * Modifies the template configuration: variables and groups. 
     * WARNING: beware that in order to modify the group properties you need
     * to know the group ids that can be retrieved with the getTemplateData
     * method or generated as follows: in order to generate the id one need to
     * know the name of all variables inclued in the group and generate the
     * md5 hash obtained from concatening with commas all those variables
     * following their order of appearance in the corresponding template.
     * For example, the group id of a table with two variables named product and
     * price will be md5('product,price')
     * 
     * @param array data an array of arrays with the folowing key values:
     *      'id': the id of the required template
     *      'settings': an array of arrays with the following key value pairs:
     *         'numberFormat': can bw ".;" or ",."
     *         'outputComments' (boolean)
     *         'outputFormat': an array with the possible, non-exclusive, values
     *          ["odt", "pdf", "doc", "docx", "doc-legacy", "rtf"]
     *     'variables': an array of arrays with the following key value pairs:
     *         'variable name': an array with the following key value pairs:
     *             'scope': can be document, form or both (default value)
     *             'label' (text)
     *             'tip' (text)
     *             'comment' (HTML text)
     *             'type': it can be text, options, date or phone.
     *             'richtext' (boolean) only applies if the type is text.
     *             'choice': dropdown, checkbox or radio. Only applies if the
     *               type is options.
     *             'options': ";" separated list of values. Only applies if the
     *              type takes the "options" value
     *             'compulsory'(boolean)
     *             'editable' (boolean)
     *             'global' (boolean)
     *             'confirm' (boolean)
     *             'validation' (string) validation name (only relevant to
     *              identify the validation in the web edition interface)
     *             'regex': regular expression used to validate this field
     *     'groups': an array of arrays with the following key value pairs:
     *          'group id': an array with the following key value pairs:
     *             'active' (boolean) if true (default value) this group
     *              is clonable
     *             'display': can be show (default) or hide
     *             'print': can be print (default), unprint (only visible in
     *              the browser) or unbrowsable (only printed and not visible
     *              in the browser)
     *             'toggleWith' (text)
     *             'toggleValues' (text)
     *  
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    modifyTemplateData(data, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/modify_template/' + data['id'];

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
        
        var options = {};
        options.id = data['id'];
        if (this.isset(data['settings'])){
            options.settings = data['settings'];
        } else {
            options.settings = {};
        }
        if (this.isset(data['variables'])){
            options.variables = data['variables'];
        } else {
            options.variables = {};
        }
        if (this.isset(data['groups'])){
            options.groups = data['groups'];
        } else {
            options.groups = {};
        }
		
        var opt = this.base64_encode_url_safe(JSON.stringify(options));
       
        return this._returnLink(url, data['id'], opt);
    }

    /**
     * Allows to remotely authenticate from any other application into the
     * associated Docxpresso SERVER installation
     * 
     * @param array $data $data with the following keys and values
     *      'email' => (string) the email of the user we want to log in.
     *       This value is compulsory and must correspond to a valid registered
     *       user email.
     *      'url' => (string) target url where the user should be redirected
     *       after being authenticated
     *      'referer' => (string) domain origin of the petition
     * @return string
     * @access public
     */
    accessByTokenAction(data)
    {    
        var url = this._options['docxpressoInstallation'] + '/users/accessByToken';

        var options = {};
        options.email = data['email'];
        options.url = data['url'];
        if (!this.empty(data['referer'])){
            options.referer = data['referer'];
        }

        var opt = this.base64_encode_url_safe(JSON.stringify(options));
      
        return this._returnLink(url, null, opt);     
    }

    /**
     * Allows to remotely create an user
     * 
     * @param array $data $data with the following keys and values
     *      'username' => (string) alias to be used within Docxpresso.
     *       This value is compulsory and can not coincide with the username 
     *       of an already registered user.
     *      'email' => (string) the email of the user we want to create.
     *       This value is compulsory and can not coincide with the email of an
     *       existing user.
     *      'password' => (string) the password of the user we want to create.
     *       This value is compulsory and must be safe.
     *      'name' => (string) full user name (compulsory)
     *      'role' => (string) it must take one of the following values: admin,
     *       editor, user, external. Default value is user.
     *      'position' => (string) user position (optional)
     *      'phone' => (string) user phone (optional)
     *      'description' => (string) short user description (optional)
     * @return string
     * @access public
     */
    createUser(data)
    {    
        var url = this._options['docxpressoInstallation'] + '/users/createRemoteUser';

        var options = {};
        options.email = data['email'];
        options.username = data['username'];
        options.password = data['password'];
        options.name = data['name'];
        if (data['role'] == "admin"){
            options.role = 3;
        } else if (data['role'] == "editor"){
            optionsrole = 2;
        } else if (data['role'] == "user"){
            options.role = 1;
        } else if (data['role'] == "external"){
            options.role = 0;
        }
        if (this.isset(data['position'])){
            options.position = data['position'];
        } else {
            options.position = " ";
        }
        if (this.isset(data['phone'])){
            options.phone = data['phone'];
        } else {
            options.phone = " ";
        }
        if (this.isset(data['description'])){
            options.description = data['description'];
        } else {
            options.description = " ";
        }

        var opt = this.base64_encode_url_safe(JSON.stringify(options));
      
        return this._returnLink(url, null, opt);     
    }

    /**
     * Create a workflow
     * 
     * @param array $data with the following keys and values
     *      'template' => (int) the id of the requested document template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'description' => (string) short (HTML) description of the workflow
     *       to be used in automated emails.
     *      'token' => (string) a unique identifier of a previous use. If given
     *       the data associated with the token will be preloaded into 
     *       the document. The default value is NULL.
     *      'ordered' => (boolean) if true (default value) the workflow will be
     *       an ordered workflow.
     *      'display' => (string) it can be 'document' (default) or 'form'.
     *      'steps' => (array) the steps should be an array of arrays each of 
     *       them with the following keys and values:
     *          'username' => (string) the name of the user associated with that
     *           step.
     *          'useremail' => (string) the email of the user associated with
     *           that step.
     *          'action' => (string) the associated action. It can take the
     *           following values: 'edit' (default value) or 'validate'.
     *          'rejectionAction' => (string) the action to be taken if a 
     *           validation is rejected. It can take the following values:
     *           'stepBack' (default value) or 'complete'.
     *          'notify' => (boolean) if true (default value) the user will be
     *           notified by email.
     *          'send' => (boolean) if true (default value) the user will
     *           receive a copy of the document upon completion of the workflow.
     *          'prefix' => (string) a prefix that will limit enduser edition to
     *           only the field variables that start by that prefix. You can use
     *           a comma separated list to select more than one prefix. Default 
     *           value is an empty string.
     *          'editableVars' => (string) a comma separated list of var names
     *           to restrict the edition to that set. Default value is an empty 
     *           string.
     *     
     * @return string
     * @access public
     */
    createWorkflow(data, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/documents/workflow/create_remote_workflow/' + data['template'];
        var workflow = {};

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
        var options = {};
        if (this.isset(data['token'])) {
            options.token = data['token'];
        }
        if (this.isset(data['display'])) {
            options.display = data['display'];
        }
	if (this.isset(data['ordered']) && !data['ordered']) {
            workflow.ordered = 0;
        } else {
            workflow.ordered = 1;
        }
        if (this.isset(data['description'])) {
            workflow.description = data['description'];
        } else {
            workflow.description = '';
        }
        //workflow steps
        workflow.steps = {};
        var numSteps = (data['steps']).length;
        for (let j = 0; j < numSteps; j++){
            workflow.steps[j] = {};
            workflow.steps[j].completed = 0;
            if (this.isset(data['steps'][j]['notify']) && !data['steps'][j]['notify']) {
                workflow.steps[j].notify = 0;
            } else {
                workflow.steps[j].notify = 1;
            }
            if (this.isset(data['steps'][j]['send']) && !data['steps'][j]['send']) {
                workflow.steps[j].send = 0;
            } else {
                workflow.steps[j].send = 1;
            }
            if (this.isset(data['steps'][j]['action']) && data['steps'][j]['action'] == 'validate') {
                workflow.steps[j].actionType = 'validate';
            } else {
                workflow.steps[j].actionType = 'edit';
            }
            if (this.isset(data['steps'][j]['rejectionAction']) && data['steps'][j]['rejectionAction'] == 'complete') {
                workflow.steps[j].rejectionAction = 'completedWF';
            } else {
                workflow.steps[j].rejectionAction = 'stepBack';
            }
            if (this.isset(data['steps'][j]['prefix'])) {
                workflow.steps[j].prefix = data['steps'][j]['prefix'];
            } else {
                workflow.steps[j].prefix = '';
            }
            if (this.isset(data['steps'][j]['editableVars'])) {
                workflow.steps[j].editableVars = data['steps'][j]['editableVars'];
            } else {
                workflow.steps[j].editableVars = '';
            }
            workflow.steps[j].useremail = data['steps'][j]['useremail'];
            workflow.steps[j].username = data['steps'][j]['username'];
        }
        options.workflow = workflow;
        var  opt = this.base64_encode_url_safe(JSON.stringify(options));
        
        return this._returnLink(url, data['template'], opt);  
    }

    /**
     * Returns a link to recover the info about a certain workflow by id
     * 
     * @param integer $id the workflow id
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    getWorkflowData(id, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/workflowData/' + id;
        
        if (!this.empty(callback)) {
            url += '/' + callback;
        }
       
        return this._returnLink(url, id);
    }

    /**
     * Returns a link to list of categories in JSON(P) format from the associated
     * Docxpresso SERVER installation
     * 
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    listCategories(callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/categories';
        
        if (!this.empty(callback)) {
            url += '/' + callback;
        }
       
        return this._returnLink(url);
    }

    /**
     * Returns a link to list of documents in a given category in JSON(P) format
     * from the associated Docxpresso SERVER installation
     * 
     * @param integer $category the corresponding category id.
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @param boolean $published if true only "published" templates will be
     * available through the request.
     * @param string $access it can be "all" (deafult value), "public" for only
     * documents declared like public or a "username" to filter by permissions
     * @return string
     * @access public
     */
    documentsByCategory(category, callback = '', published = 0, access = 'all')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/documents_by_category/' + category;

        if (!this.empty(callback)) {
            url += '/' + callback;
        } else {
            url += '/NULL';
        }

        if (!this.empty(published)) {
            url += '/1';
        } else {
            url += '/0';
        }
        
        if (!this.empty(access)) {
            url += '/' + encodeURIComponent(access);
        }
		
        return this._returnLink(url);
    }

    /**
     * Allows to change the password associated with a user email.
     * 
     * @param string $email user unique email identifier.
     * @param string $password new password. It should be, at least 12 chars long
     * and contain at least an uppercase letter, a lowercase letter, a number
     * and a non-standard char: !,%,&,@,#,$,^,*,?,_,~
     * @param boolean $notify set it to true (default value) if you want to
     * the user of the password change
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    modifyPassword(email, password, notify = true, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/modify_password';

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
	    var options = {};
        options.email = email;
        options.password = password;
        options.notify = notify;

        var opt = this.base64_encode_url_safe(JSON.stringify(options));
        return this._returnLink(url, null, opt);
    }

    /**
     * Allows to modify the configuration of Signature Providers. If the
     * requested signature provider does not exist and it belongs to one of
     * the current available ones the corresponding entry will be created.
     * 
     * @param string $provider the name of the signature provider. Currently
     * the only available ones are vidSigner, lleida.net or nodalblock
     * @param string $config base64 encoded config JSON.
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    modifySignatureProvider(provider, config, callback = '')
    {    
        var url = this_options['docxpressoInstallation'] + '/RESTservices/predefined/modify_signature_providers/' + provider;

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
	    var options = {};
        options.custom = config;

        var opt = this.base64_encode_url_safe(JSON.stringify(options));
        return this._returnLink(url, null, opt);
    }

    /**
     * Allows to delete a current signature provider.
     * 
     * @param string $provider the name of the signature provider. Currently
     * the only available one is vidSigner
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @param boolean $published if true only "published" templates will be
     * available through the request.
     * @return string
     * @access public
     */
    deleteSignatureProvider(provider, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/delete_signature_providers/' + provider;

        return this._returnLink(url);
    }

    /**
     * List all Signature Providers
     * 
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @param boolean $published if true only "published" templates will be
     * available through the request.
     * @return string
     * @access public
     */
    listSignatureProviders(callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/list_signature_providers';

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
		
        return this._returnLink(url);
    }

    /**
     * Returns a link to download the whole document (sub)tree in JSON(P) format  
     * from the associated Docxpresso SERVER installation
     * 
     * @param mixed $rootCategory the corresponding category id from which
     * we want to build the document tree. Default value is 'root' that corresponds
     * with the "root category"
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @param boolean $published if true only "published" templates will be
     * available through the request.
     * @param string $access it can be "all" (deafult value), "public" for only
     * documents declared like public or a "username" to filter by permissions
     * @return string
     * @access public
     */
    documentTree(rootCategory= 'root', callback = '', published = 0, access = 'all')
    {    
        if (rootCategory == 'root') {
            rootCategory = 1;
        }
        
        var url = this._options['docxpressoInstallation']  + '/RESTservices/predefined/document_tree/' + rootCategory;

        if (!this.empty(callback)) {
            url += '/' + callback;
        } else {
            url += '/NULL';
        }

        if (!this.empty(published)) {
            url += '/1';
        } else {
            url += '/0';
        }
        
        if (!this.empty(access)) {
            url += '/' + encodeURIComponent(access);
        }

        return this._returnLink(url);
    }

     /**
     * Returns a link to download the whole category (sub)tree in JSON(P) format  
     * from the associated Docxpresso SERVER installation. If you need to include
     * documents use the documentTree method instead.
     * 
     * @param mixed $rootCategory the corresponding category id from which
     * we want to build the document tree. Default value is 'root' that corresponds
     * with the "root category"
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    categoryTree(rootCategory= 'root', callback = '')
    {    
        if (rootCategory == 'root') {
            rootCategory = 1;
        }
        
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/category_tree/' + rootCategory;

        if (!this.empty(callback)) {
            url += '/' + callback;
        } else {
            url += '/NULL';
        }

        return this._returnLink(url);
    }

    /**
     * Returns a link to download all documents with a given name in JSON(P)  
     * format from the associated Docxpresso SERVER installation
     * 
     * @param string $name the name of the template we are looking for. This
     * method launches a "LIKE" SQL query.
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @param boolean $published if true only "published" templates will be
     * available through the request.
     * @param string $access it can be "all" (deafult value), "public" for only
     * documents declared like public or a "username" to filter by permissions
     * @return string
     * @access public
     */
    templatesByName(name, callback = '', published = 0, access = "all")
    {    
        var url = this._options['docxpressoInstallation'];
        url += '/RESTservices/predefined/documents_by_name/' + encodeURIComponent(name);

        if (!this.empty(callback)) {
            url += '/' + callback;
        } else {
            url += '/NULL';
        }

        if (!this.empty(published)) {
            url += '/1';
        } else {
            url += '/0';
        }
        
        if (!this.empty(access)) {
            url += '/' + encodeURIComponent(access);
        }

        return this._returnLink(url);
    }

    /**
     * Returns a link to download the info (thumbnail included) of the most
     * recently edited templates
     * 
     * @param string $limit the number of templates we want to retrieve.
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @param boolean $published if true only "published" templates will be
     * available through the request.
     * @return string
     * @access public
     */
    latestTemplates(limit, callback = '', published = 0)
    {    
        var url = this._options['docxpressoInstallation'];
        url += '/RESTservices/predefined/latest_templates/' + limit;

        if (!this.empty(callback)) {
            url += '/' + callback;
        } else {
            url += '/NULL';
        }

        if (!this.empty(published)) {
            url += '/1';
        } else {
            url += '/0';
        }

        return this._returnLink(url);
    }

    /**
     * Returns a link to get all templates ids that have certain Tags
     * 
     * @param array $data with the following keys and values
     *      'tags' => (array) list of tags to be searche for
     *      'category' => (integer) the category we want to filter by if any.
     *       Subcategories are not included.
     *      'published' => (boolean) if true only published templates are
     *       returned.
     *      'active' => (boolean)if true (default value) only "non-deleted"
     *       tempaltes are returned.
     *      'sort' => (string) the field used to sort the results.
     *      'order' => (string) possible values are DESC (default) or ASC.
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * available through the request.
     * @return string
     * @access public
     */
    searchTemplatesByTag(data, callback = '')
    {    
        var url = this._options['docxpressoInstallation'];
        url += '/RESTservices/predefined/search_templates_by_tags';

        if (!this.empty(callback)) {
            url += '/' + callback;
        } else {
            url += '/NULL';
        }

        //we build and options object with the search filters
        var options = {};
        if (!this.empty(data['tags'])) {
            options.tags = data['tags'];
        }
        if (!this.empty(data['category'])) {
            options.category = data['category'];
        }
        if (this.isset(data['published'])) {
            options.published = data['published'];
        }
        if (this.isset(data['active'])) {
            options.active = data['active'];
        }
        if (!this.empty(data['sort'])) {
            options.sort = data['sort'];
        }
        if (!this.empty(data['order'])) {
            options.order = data['order'];
        }
        

        var opt = this.base64_encode_url_safe(JSON.stringify(options));

        return this._returnLink(url, null, opt);
    }

    /**
     * Returns a link to list all documents with a given name and/or a   
     * given category from the associated Docxpresso SERVER installation
     * 
     * @param integer $page the page we want to retrieve
     * @param array $data with the following keys and values
     *      'name' => (string) the name we want to filter the results with a 
     *       LIKE%% clause. This parameter is optional.
     *      'category' => (integer) the category we want to filter by if any.
     *       Subcategories are not included.
     *      'numResults' => (int) number of results per page. This number can 
     *       not be bigger than 100 and it defaults to 20.
     *      'sort' => (string) the field used to sort the results.
     *      'order' => (string) possible values are DESC (default) or ASC.
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    listTemplatesPaginated(page, data = {}, callback = '')
    {    
        var url = this._options['docxpressoInstallation'];
        url += '/RESTservices/predefined/list_templates_paginated/' + page;

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
        
        //we build and options object with the search filters
        var options = {};
        if (!this.empty(data['name'])) {
            options.identifier = data['name'];
        }
        if (!this.empty(data['numResults'])) {
            options.numResults = data['numResults'];
        }
        if (!this.empty(data['category'])) {
            options.category = data['category'];
        }
        if (!this.empty(data['sort'])) {
            options.sort = data['sort'];
        }
        if (!this.empty(data['order'])) {
            options.order = data['order'];
        }
        

        var opt = this.base64_encode_url_safe(JSON.stringify(options));

        return this._returnLink(url, null, opt);
    }

    /**
     * Returns a link to download the data of a given single usage JSON(P)  
     * format from the associated Docxpresso SERVER installation
     * 
     * @param integer $limit the max numbers of uses to be downloaded. This
     * parameter is compulsory. If bigger then the max allowed limit the number
     * of results will be truncated.
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    lastUsages(limit, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/last_usages/' + limit;

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
		
        return this._returnLink(url);
    }

    /**
     * Returns a list of the lestest used templates
     * 
     * @param integer $limit the max numbers of uses to be downloaded. This
     * parameter is compulsory. If bigger then the max allowed limit the number
     * of results will be truncated. Default number is 10.
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    lastUsedTemplates(limit = 10, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/last_used_templates/' + limit;

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
		
        return this._returnLink(url);
    }

    /**
     * Returns a link to download all template usage data in JSON(P)  
     * format  for a given template id from the associated Docxpresso 
     * SERVER installation
     * 
     * @param array $data with the following keys and values
     *      'id' => (int) the id of the template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'identifier' => (string) the identifier field of an usage. The
     *       default value is an empty string
     *      'reference' => (string) the reference field of an usage. The
     *       default value is an empty string
     *      'enduserid' => (string) the end user id of a particular usage.
     *       Default value is an empty string.
     *      'period' => (string) if given will overwrite the given startDate and
     *       enddate parameters. The possible values are: today, 
     *       1week (last week), 1month (last month), 3month (last quarter),
     *       year (last year). The default value is empty
     *      'startDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened after it. Default value is an empty 
     *       string. Optionally you may include de time in the format hh:mm:ss
     *      'endDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened before it. Default value is an empty 
     *       string. Optionally you may include de time in the format hh:mm:ss
     *      'locked' => (integer) it can be zero for all usages (default), 1 if
     *       we only want usages that have been set as completed or 2 for the 
     *       opposite.
     *      'firstResult' => (int) query offset. Default value is 0; 
     *      'maxResults' => (int) maximum number of results. Beware that
     *       each installation may have upper limits to this number.
     *       Default value is empty and Docxpresso default will be used (50).
     *      'sort' => (string) the field used to sort the results.
     *      'order' => (string) possible values are DESC (default) or ASC.
     *      'client' => (integer) cliend id. Only for multi tenant instances. 
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    dataByTemplate(data, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/data_by_template/' + data['id'];
		
        if (!this.empty(callback)) {
                url += '/' + callback;
        }

        //we build and options object with the search filters
        var options = {};
        if (!this.empty(data['identifier'])) {
            options.identifier = data['identifier'];
        }
        if (!this.empty(data['client'])) {
            options.client = data['client'];
        }
        if (!this.empty(data['reference'])) {
            options.reference = data['reference'];
        }
        if (!this.empty(data['enduserid'])) {
            options.enduserid = data['enduserid'];
        }
        if (!this.empty(data['locked'])) {
            options.locked = data['locked'];
        }
        //dates must be in the format 2016-01-30
        if (!this.empty(data['startDate'])) {
            options.startDate = data['startDate'];
        }
        if (!this.empty(data['endDate'])) {
            options.endDate = data['endDate'];
        }
        if (!this.empty(data['period'])) {
            options.period = data['period'];
        }
        if (!this.empty(data['firstResult'])) {
            options.firstResult = data['firstResult'];
        }
        if (!this.empty(data['maxResults'])) {
            options.maxResults = data['maxResults'];
        }
        if (!this.empty(data['sort'])) {
            options.sort = data['sort'];
        }
        if (!this.empty(data['order'])) {
            options.order = data['order'];
        }

        var opt = this.base64_encode_url_safe(JSON.stringify(options));
		
        return this._returnLink(url, data['id'], opt);
    }

    /**
     * Returns a link to download the 'paginated' template usage data in JSON(P)  
     * format  for a given template id from the associated Docxpresso 
     * SERVER installation
     * 
     * @param integer $page the page we want to retrieve
     * @param array $data with the following keys and values
     *      'id' => (int) the id of the template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'identifier' => (string) the identifier field of an usage. The
     *       default value is an empty string
     *      'reference' => (string) the reference field of an usage. The
     *       default value is an empty string
     *      'enduserid' => (string) the end user id of a particular usage.
     *       Default value is an empty string.
     *      'period' => (string) if given will overwrite the given startDate and
     *       enddate parameters. The possible values are: today, 
     *       1week (last week), 1month (last month), 3month (last quarter),
     *       year (last year). The default value is empty
     *      'startDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened after it. Default value is an empty 
     *       string.
     *      'endDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened before it. Default value is an empty 
     *       string.
     *      'locked' => (integer) it can be zero for all usages (default), 1 if
     *       we only want usages that have been set as completed or 2 for the 
     *       opposite.
     *      'numResults' => (int) number of results per page. This number can 
     *       not be bigger than 100 and it defaults to 20.
     *      'sort' => (string) the field used to sort the results.
     *      'order' => (string) possible values are DESC (default) or ASC.
     *      'client' => (integer) cliend id. Only for multi tenant instances. 
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    dataByTemplatePaginated(page, data, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/data_by_template_paginated/' + data['id'] + '/' + page;
		
        if (!this.empty(callback)) {
                url += '/' + callback;
        }

        //we build and options object with the search filters
        var options = {};
        if (!this.empty(data['identifier'])) {
            options.identifier = data['identifier'];
        }
        if (!this.empty(data['client'])) {
            options.client = data['client'];
        }
        if (!this.empty(data['reference'])) {
            options.reference = data['reference'];
        }
        if (!this.empty(data['enduserid'])) {
            options.enduserid = data['enduserid'];
        }
        if (!this.empty(data['locked'])) {
            options.locked = data['locked'];
        }
        //dates must be in the format 2016-01-30
        if (!this.empty(data['startDate'])) {
            options.startDate = data['startDate'];
        }
        if (!this.empty(data['endDate'])) {
            options.endDate = data['endDate'];
        }
        if (!this.empty(data['period'])){
            options.period = data['period'];
        }
        if (!this.empty(data['numResults'])) {
            options.numResults = data['numResults'];
        }
        if (!this.empty(data['sort'])) {
            options.sort = data['sort'];
        }
        if (!this.empty(data['order'])) {
            options.order = data['order'];
        }

        var opt = this.base64_encode_url_safe(JSON.stringify(options));
		
        return this._returnLink(url, data['id'], opt);
    }

    /**
     * Returns a link to download the 'paginated' template usage data in JSON(P)  
     * format from the associated Docxpresso SERVER installation
     * 
     * @param integer $page the page we want to retrieve
     * @param array $data with the following keys and values
     *      'id' => (int) the id of the template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'identifier' => (string) the identifier field of an usage. The
     *       default value is an empty string
     *      'reference' => (string) the reference field of an usage. The
     *       default value is an empty string
     *       'domain' => (string) the domain field of an usage. The
     *       default value is an empty string
     *      'enduserid' => (string) the end user id of a particular usage.
     *       Default value is an empty string.
     *      'period' => (string) if given will overwrite the given startDate and
     *       enddate parameters. The possible values are: today, 
     *       1week (last week), 1month (last month), 3month (last quarter),
     *       year (last year). The default value is empty
     *      'startDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened after it. Default value is an empty 
     *       string.
     *      'endDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened before it. Default value is an empty 
     *       string.
     *      'locked' => (integer) it can be zero for all usages (default), 1 if
     *       we only want usages that have been set as completed or 2 for the 
     *       opposite.
     *      'numResults' => (int) number of results per page. This number can 
     *       not be bigger than 100 and it defaults to 20.
     *      'sort' => (string) the field used to sort the results.
     *      'order' => (string) possible values are DESC (default) or ASC.
     *      'client' => (integer) cliend id. Only for multi tenant instances. 
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    getUsageDataPaginated(page, data, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/get_usage_data_paginated/' + page;
		
        if (!this.empty(callback)) {
                url += '/' + callback;
        }

        //we build and options object with the search filters
        var options = {};
        if (!this.empty(data['id'])) {
            options.id = data['id'];
        }
        if (!this.empty(data['identifier'])) {
            options.identifier = data['identifier'];
        }
        if (!this.empty(data['client'])) {
            options.client = data['client'];
        }
        if (!this.empty(data['reference'])) {
            options.reference = data['reference'];
        }
        if (!this.empty(data['enduserid'])) {
            options.enduserid = data['enduserid'];
        }
        if (!this.empty(data['domain'])) {
            options.domain = data['domain'];
        }
        if (!this.empty(data['locked'])) {
            options.locked = data['locked'];
        }
        //dates must be in the format 2016-01-30
        if (!this.empty(data['startDate'])) {
            options.startDate = data['startDate'];
        }
        if (!this.empty(data['endDate'])) {
            options.endDate = data['endDate'];
        }
        if (!this.empty(data['period'])){
            options.period = data['period'];
        }
        if (!this.empty(data['numResults'])) {
            options.numResults = data['numResults'];
        }
        if (!this.empty(data['sort'])) {
            options.sort = data['sort'];
        }
        if (!this.empty(data['order'])) {
            options.order = data['order'];
        }

        var opt = this.base64_encode_url_safe(JSON.stringify(options));
		
        return this._returnLink(url, null, opt);
    }

    /**
     * Returns a link to download the data of a given single usage JSON(P)  
     * format from the associated Docxpresso SERVER installation
     * 
     * @param integer $usageId the id of a particular usage
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    dataByUsage(usageId, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/data_by_usage/' + usageId;

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
		
        return this._returnLink(url, usageId);
    }

    /**
     * Returns a link to generate a HTML or CSV file for all the data usage
     * for a given template  
     * 
     * @param array $data with the following keys and values
     *      'id' => (int) the id of the template. This value is compulsory and 
     *       must correspond to a valid template id.
     *      'format' => (string) it may be html or csv (default)
     *      'identifier' => (string) the identifier field of an usage. The
     *       default value is an empty string
     *      'reference' => (string) the reference field of an usage. The
     *       default value is an empty string
     *      'enduserid' => (string) the end user id of a particular usage.
     *       Default value is an empty string.
     *      'idrange' => (string) the range of ids that should be filtered, i.e.
     *       120-145. Default value is an empty string.
     *      'period' => (string) if given will overwrite the given startDate and
     *       enddate parameters. The possible values are: today, 
     *       1week (last week), 1month (last month), 3month (last quarter),
     *       year (last year). The default value is empty
     *      'startDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened after it. Default value is an empty 
     *       string.
     *      'endDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened before it. Default value is an empty 
     *       string.
     *      'locked' => (integer) it can be zero for all usages (default), 1 if
     *       we only want usages that have been set as completed or 2 for the 
     *       opposite.
     *      'firstResult' => (int) query offset. Default value is 0; 
     *      'maxResults' => (int) maximum number of results. Beware that
     *       each installation may have upper limits to this number.
     *       Default value is an empty and in that case Docxpresso
     *      'sort' => (string) the field used to sort the results.
     *      'order' => (string) possible values are DESC (default) or ASC.
     *      'client' => (integer) cliend id. Only for multi tenant instances. 
     * @return string
     * @access public
     */
    dataDigestByUsage(data)
    {    
        var url = this._options['docxpressoInstallation'] + '/data/digest/' + data['id'] ;

        var url = this._returnLink(url, data['id'], null) + '&';

        //we build the URL with the search filters and output format
        if (!this.empty(data['format'])) {
            url += 'format=' + data['format'] + '&';
        } else {
            url += 'format=csv&';
        }
        if (!this.empty(data['identifier'])) {
            url += 'identifier=' + data['identifier'] + '&';
        }
        if (!this.empty(data['client'])) {
            url += 'client=' + data['client'] + '&';
        }
        if (!this.empty(data['reference'])) {
            url += 'reference=' + data['reference'] + '&';
        }
        if (!this.empty(data['enduserid'])) {
            url += 'enduserid=' + data['enduserid'] + '&';
        }
        //dates like before and after must be in the format 2016-01-30
        if (!this.empty(data['startDate'])) {
            url += 'before=' + data['startDate'] + '&';
        }
        if (!this.empty(data['endDate'])) {
            url += 'after=' + data['endDate'] + '&';
        }
        if (!this.empty(data['period'])) {
            url += 'period=' + data['period'] + '&';
        }
        if (!this.empty(data['domain'])) {
            url += 'domain=' + data['domain'] + '&';
        }
        if (!this.empty(data['idrange'])) {
            url += 'idrange=' + data['idrange'] + '&';
        }
        if (!this.empty(data['locked'])) {
            url += 'locked=' + data['locked'] + '&';
        }
        if (!this.empty(data['maxResults'])) {
            url += 'maxResults=' + data['maxResults'] + '&';
        }
        if (!this.empty(data['sort'])) {
            url += 'sort=' + data['sort'] + '&';
        }
        if (!this.empty(data['order'])) {
            url += 'order=' + data['order'];
        }
        url += 'extra=1'
        return this._returnLink(url, data['id']);
    }

    /**
     * Returns a link to download all template forwarded docs in JSON(P)  
     * format  for a given template id from the associated Docxpresso 
     * SERVER installation
     * 
     * @param array $data with the following keys and values
     *      'id' => (int) the id of the template.
     *       This value is compulsory and must correspond to a valid template
     *       id.
     *      'identifier' => (string) the identifier field of an usage. The
     *       default value is an empty string
     *      'reference' => (string) the reference field of an usage. The
     *       default value is an empty string
     *      'processed' => (integer) a flag that allows to set the processing
     *       status. By default forwarded documents have a processed status of
     *       0. This processed status may be managed remotely via the
     *       fetchForwardedDocument method of the SDK
     *      'period' => (string) if given will overwrite the given startDate and
     *       enddate parameters. The possible values are: today, 
     *       1week (last week), 1month (last month), 3month (last quarter),
     *       year (last year). The default value is empty
     *      'startDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened after it. Default value is an empty 
     *       string.
     *      'endDate' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened before it. Default value is an empty 
     *       string.
     *      'firstResult' => (int) query offset. Default value is 0; 
     *      'maxResults' => (int) maximum number of results. Beware that
     *       each installation may have upper limits to this number.
     *       Default value is empty and Docxpresso default will be used (50).
     *      'sort' => (string) the field used to sort the results.
     *      'order' => (string) possible values are DESC (default) or ASC.
     *      'client' => (integer) cliend id. Only for multi tenant instances. 
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    forwardedDocumentsByTemplate(data, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/forwarded_documents_by_template/' + data['id'];
		
        if (!this.empty(callback)) {
                url += '/' + callback;
        }

        //we build and options object with the search filters
        var options = {};
        if (!this.empty(data['identifier'])) {
            options.identifier = data['identifier'];
        }
        if (!this.empty(data['client'])) {
            options.client = data['client'];
        }
        if (!this.empty(data['reference'])) {
            options.reference = data['reference'];
        }
        if (!this.empty(data['processed'])) {
            options.processed = data['processed'];
        }
        //dates must be in the format 2016-01-30
        if (!this.empty(data['startDate'])) {
            options.startDate = data['startDate'];
        }
        if (!this.empty(data['endDate'])) {
            options.endDate = data['endDate'];
        }
        if (!this.empty(data['period'])) {
            options.period = data['period'];
        }
        if (!this.empty(data['firstResult'])) {
            options.firstResult = data['firstResult'];
        }
        if (!this.empty(data['maxResults'])) {
            options.maxResults = data['maxResults'];
        }
        if (!this.empty(data['sort'])) {
            options.sort = data['sort'];
        }
        if (!this.empty(data['order'])) {
            options.order = data['order'];
        }

        var opt = this.base64_encode_url_safe(JSON.stringify(options));
		
        return this._returnLink(url, data['id'], opt);
    }

    /**
     * Returns a link to modify the data and options of a particular usage.
     * In order to avoid unwanted/accidental changes of data we request together
     * with the usageId its unique assocated token
     * 
     * 
     * @param integer $usageId the id of a particular usage
     * @param array $data with the following keys and values
     *      'token' => (string) the unique identifier of this use. This is
     *       only required for security to avoid unintentional changes in the 
     *       usage data.
     *      'identifier' => (string) the identifier value that we want to
     *       overwrite. Default value is an empty string 
     *      'reference' => (string) the reference value that we want to
     *       overwrite. Default value is an empty string 
     *      'validated' => (boolean) an optional boolean parameter to overwrite
     *       the previous value.
     *      'tampered' => (boolean) an optional boolean parameter to overwrite
     *       the previous value.
     *      'locked' => (boolean) an optional boolean parameter to overwrite
     *       the previous value. It is also may be interpreted as "completed"
     *      'domain' => (string) an optional parameter to overwrite the domain
     *       property.
     *      'user' => (string) an optional parameter to overwrite the user
     *       name associated with the selected usage.
     *       the previous value. It is also may be interpreted as "completed"
     *      'comments' => (string) if not empty it will overwrite the comments
     *       associated with this usage. Default value is an empty 
     *       string.
     *      'percentageCompleted' => (integer) if given  overwrites the value of
     *       the percentage completed. 
     *       string.
     *      'varData' => JSON data that will be merged with the previous stored
     *       document data (by the time being only variable values).
     *      'callback' => function name for JSONP calls.
     *      'plugin' => (boolean) if true the petition may directly come from
     *       a plugin user so further security checks may be carried out to test
     *       for data coherence and permissions.
     * @return string
     * @access public
     */
    modifyUsageData(usageId, data)
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/modify_usage_data/' + usageId;
        
        var options = {};
        if (this.isset(data['token'])) {
            options.token = data['token'];
        }
        if (this.isset(data['identifier'])) {
            options.identifier = data['identifier'];
        }
        if (this.isset(data['reference'])) {
            options.reference = data['reference'];
        }
        if (this.isset(data['domain'])) {
            options.domain = data['domain'];
        }
        if (this.isset(data['user'])) {
            options.enduserid = data['user'];
        }
        if (this.isset(data['tampered']) && data['tampered']) {
            options.tampered = 1;
        } else if (this.isset(data['tampered']) && !data['tampered']) {
            options.tampered = 0;
        }
        if (this.isset(data['validated']) && data['validated']) {
            options.validated = 1;
        } else if (this.isset(data['validated']) && !data['validated']) {
            options.validated = 0;
        } 
        if (!this.empty(data['locked']) && data['locked']) {
            options.locked = 1;
        } else if (this.isset(data['locked']) && !data['locked']) {
            options.validated = 0;
        }
        if (!this.empty(data['comments'])) {
            options.comments = data['comments'];
        }
        if (this.isset(data['varData'])) {
            options.data = data['varData'];
        }
        if (this.isset(data['callback'])) {
            options.callback = data['callback'];
        }
        if (this.isset(data['plugin'])) {
            options.plugin = data['plugin'];
        }
        
	    var opt = this.base64_encode_url_safe(JSON.stringify(options));	
        return this._returnLink(url, usageId, opt);
    }

    /**
     * Returns a link to get a JSON with both the document base64 encoded 
     * together with the other usage data 
     * 
     * @param integer $usageId the id of a particular usage
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    documentAndDataByUsage(usageId, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/document_and_data_by_usage/' + usageId;

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
		
        return this._returnLink(url, usageId);
    }

    /**
     * Returns a link to download basic statistical data like number of uses
     * and last usage
     * 
     * @param mixed $id template id. If set to 'all' the data
     * for all available templates will be provided
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty or NULL plain JSON will be returned.
     * @param boolean $published if true only "published" templates will be
     * available through the request.
     * @return string
     * @access public
     */
    dataStatistics(id = 'all', callback = '', published = 0)
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/data_statistics';
		
        if (!this.empty(id)) {
            url += '/' + id;
        } else {
            url += '/all';
        }
		
        if (!this.empty(callback)) {
            url += '/' + callback;
        } else if (!this.empty(published)) {
            url += '/NULL';
        }

        if (!this.empty(published)) {
            url += '/1';
        }

        return this._returnLink(url, id);
    }
    
    /**
     * Returns a link to download the total usage count group by day 
     * 
     * @param array $data with the following keys and values
     *      'id' => (mixed) the id of the template. If set to 'all' the data
     *       for all available templates will be provided.
     *      'after' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened after it. Default value is an empty 
     *       string.
     *      'before' => (string) a date in the format yyyy-mm-dd that will
     *       select usages that happened before it. Default value is an empty 
     *       string.
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty or NULL plain JSON will be returned.
     * @return string
     * @access public
     */
    usageCount(data = {}, callback = '')
    {    
        if (!this.isset(data['id'])) {
            data['id'] = 'all';
        }
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/usage_count/' + data['id'];
		
        if (!this.empty(callback)) {
            url += '/' + callback;
        }

        //we build and options object with the search filters
        var options = {};
        if (!this.empty(data['before'])) {
            options.before = data['before'];
        }
        if (!this.empty(data['after'])) {
            options.after = data['after'];
        }

        var opt = this.base64_encode_url_safe(JSON.stringify(options));
		
        return this._returnLink(url, data['id'], opt);
    }

    /**
     * Returns a link to list of users in JSON(P) format from the associated
     * Docxpresso SERVER installation
     * 
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    userList(callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/users';

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
       
        return this._returnLink(url);
    }

    /**
     * Returns a link to check if the the user is logged into the associated
     * Docxpresso SERVER installation
     * 
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    checkUser(callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/check_user';

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
       
        return this._returnLink(url);
    }

    /**
     * Returns a link to clone a template
     * 
     @param integer $id the id of the template we want to clone
     * @param array $data with the following keys and values
     *      'name' => (string) the name given to the cloned template.
     * @return string
     * @access public
     */
    cloneTemplate(id, data = {}, callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/RESTservices/predefined/clone_template/' + id;

        if (!this.empty(callback)) {
            url += '/' + callback;
        }
        
        //we build and options object
        var options = {};
        if (!this.empty(data['name'])) {
            options.name = data['name'];
        }

       
        var opt = this.base64_encode_url_safe(JSON.stringify(options));	
        return this._returnLink(url, id, opt);
    }

    /**
     * Returns a link to use in a form or via a cURL POST
     * The post fields should include:
     *  'email' the valid email of a registered Docxpresso EDITOR/ADMIN user
     *  'path' a file input field
     *  'name' a unique name for the new template
     *  'config' an array JSON encoded with additional configuration options
     *  'category' the category id where the template should be stored
     *  'tags' a comma separated string of tags associated with the template (optional)
     *  'public' a boolean value (1 or 0) setting internal write/read permissions for
     *   editors. Default value is 1 (all editors have access).
     *  'accessControl' a boolean value (1 or 0). If equals 0 there is free
     *   access to that document by end users. Default value is 1.
     *  'description' an optional description
     * 
     @param integer $id the id of the template we want to update
     * @param array $data with the following keys and values
     *      'responseURL' => redirect URL if used as an action in a form.
     *      'callback' => (string) the callback function if called as JSONP.
     * @return string
     * @access public
     */
    createTemplate(data = {})
    {    
        var id =  Math.floor(Math.random() * (9999999 - 9999) + 9999999);
        var url = this._options['docxpressoInstallation'] + '/documents/remote_create_template/' + id;
        
        //we build and options object
        var options = {};
        if (!this.empty(data['responseURL'])) {
            options.responseURL = data['responseURL'];
        }
        if (!this.empty(data['callback'])) {
            options.callback = data['callback'];
        }
       
        var opt = this.base64_encode_url_safe(JSON.stringify(options));	
        return this._returnLink(url, id, opt);
    }

    /**
     * Returns a link to use in a form or via a cURL POST
     * The post fields should include:
     *  'path' a file input field
     *  'keepThumb' a field that if not empty will preserve the current
     *   document thumbnail
     * 
     @param integer $id the id of the template we want to update
     * @param array $data with the following keys and values
     *      'responseURL' => redirect URL if used as an action in a form.
     *      'callback' => (string) the callback function if called as JSONP.
     * @return string
     * @access public
     */
    uploadTemplate(id, data = {})
    {    
        var url = this._options['docxpressoInstallation'] + '/documents/upload_template/' + id;
        
        //we build and options object
        var options = {};
        if (!this.empty(data['responseURL'])) {
            options.responseURL = data['responseURL'];
        }
        if (!this.empty(data['callback'])) {
            options.callback = data['callback'];
        }
       
        var opt = this.base64_encode_url_safe(JSON.stringify(options));	
        return this._returnLink(url, id, opt);
    }

    /**
     * Returns a link to resend pending webhooks.
     * 
     * @param string $callback the callback name that we want to use for padded
     * JSON responses. If empty plain JSON will be returned.
     * @return string
     * @access public
     */
    managePendingWebhooks(callback = '')
    {    
        var url = this._options['docxpressoInstallation'] + '/data/webhook/pending';

        if (!this.empty(callback)) {
            url += '/' + callback;
        }

        return this._returnLink(url);
    }

    /**
     * Creates the link requested by all other methods
     * 
     * @param string $url
     * @param mixed $id
     * @param mixed $opt
     * @return string
     * @access private
     */
    _returnLink(url, id = null, opt = null)
    {
    //console.log(id, opt)
        var uniqid = this.generate_uniqid();
        var timestamp = Math.floor(Date.now()/1000);
         

        //var uniqid = 1234;
        //var timestamp = 56789;

        var control = '';
        if (id!==null){
            control +=  id + '-';
        } 
        control += timestamp + '-' + uniqid;
 
        if (opt!==null){
            control += '-' + opt;
        } 
        //console.log('control ='+control);
        //we should now redirect to Docxpresso
        
        var dataKey = require('crypto');
        var shasum = dataKey.createHash('sha1')
        .update(control)
        .digest('bin');

        var masterKey = this._options['pKey'];

        var APIKEY = require('crypto')
        .createHmac('sha1', masterKey)
        .update(shasum)
        .digest('hex');

        //console.log(APIKEY);
        var addr = url + '?';
        addr += 'timestamp=' + timestamp +'&';
        addr += 'uniqid=' + uniqid + '&';
        addr += 'APIKEY=' + APIKEY;

        if((opt)!==null){
            addr+= '&options=' + opt;
        }
         
        return addr;
    }

    /*********************************************/
    /*               ACCESS CONTROL              */
    /*      For data exchange with Docxpresso    */
    /*********************************************/ 
    
    /**
     * Whenever interacting with Docxpresso via a requestDataURI or 
     * responseDataURI parameters of the documentPreview method there
     * is an APIKEY based on HMAC that allows to identify petitions as
     * legitimate.
     * This method simplifies the task to check if the request is legitimate
     * by returning a boolean value: true for authorized requests and false
     * otherwise
     * 
     * @param string $data the POST/GET variable data sent along with 
     * the request
     * @param string $timestamp the POST/GET variable timestamp sent along with 
     * the request
     * @param string $uniqid the POST/GET variable uniqid sent along with 
     * the request
     * @param string $APIKEY the POST/GET variable APIKEY sent along with 
     * the request
     * @return boolean
     * @access public
     */
    checkAPIKEY(data, timestamp, uniqid, APIKEY)
    {

        var forward =  require('crypto').createHash('sha1')
        .update(timestamp + '-' + uniqid + '-' + data )
        .digest('bin');
        
        var masterKey = this._options['pKey'];

        var refAPIKEY = require('crypto')
        .createHmac('sha1', masterKey)
        .update(forward)
        .digest('hex');
        
        if (refAPIKEY == APIKEY){
            return true;
        } else {
            return false;
        }
    }

    /**
     * Whenever sending a request to an external API service the timestamp
     * and a service token are added to the query parameters.
     * 
     * This method checks that the pair timestamp and token where generated
     * from the given Docxpresso installation
     * 
     * @param string $timestamp the GET variable timestamp sent along with 
     * the request
     * @param string $token the GET variable uniqid sent along with 
     * the request
     * @param integer $expires number of seconds before the token expires. 
     * Default value is 3600.
     * @return boolean
     * @access public
     */
    checkServiceToken(timestamp, token, expires = 3600)
    {
        var currentTime = Math.floor(Date.now()/1000);
        var myTime =  parseInt(timestamp);
        if (currentTime - myTime > expires){
            return false;
        }
        var masterKey = this._options['pKey'];

        var forward = require('crypto').createHash('sha1')
        .update(timestamp + masterKey + timestamp)
        .digest('bin');
        
        var refToken = require('crypto')
        .createHmac('sha1', masterKey)
        .update(forward)
        .digest('hex');
    
        if (refToken == token){
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns a 12 chars random OTP
     * 
     * @return string
     * @access private
     */
    _generateOTP ()
    {
        random = Math.floor(Math.random() * (9999999 - 9999) + 9999999);
        timestamp =  Math.floor(Date.now()/1000);
        var crypto = require('crypto')
        var raw = crypto.createHash('sha1').update('otp' + random + '_' + timestamp + 'A random sentence').digest('hex')
        return raw.substr(6, 12);
    }

    empty (data)
    {
        if(data=== undefined ||  data === '' || data === null || data  === 0){
            return true;
        }
            return false;
    }

    isset (accessor) {
        if (typeof accessor !== 'undefined') {
            return true;
          }
          return false;
      }

    generate_uniqid(){
        return new Date().valueOf() + Math.floor(Math.random() * (9999999 - 99999) + 99999);
    }
}




