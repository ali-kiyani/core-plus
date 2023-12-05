
# Core Plus

## Business Requirements
1. As a coreplus account supervisor, I need a way to generate a financial report to analyse 
profitability of my practitioners over the past 3 years. The report should be accessible within 
the coreplus user interface, where the user can populate criteria and see results.
Report criteria:
* Which practitioners to report (this can be done by selecting a practitioner from the list) on 
Date range (this can be specified using some sort of datepicker or any other appropriate 
inputs)
Report output:
* For each practitioner, display cost and revenue per month within the given date range.
2. Once the report had been generated, clicking on a practitioner should display a 
breakdown of that practitioner’s appointments, each with its cost and revenue, on the same 
screen. The summary report should still be visible on the page.

3. Clicking on an appointment, should display details of that appointment (e.g. date, client’s 
name, appointment type, appointment duration) in another section of the page. The 
summary and breakdown should still be visible on the page.

4. The practitioners must be displayed in a list from which they can be selected. The list 
must be separated into two parts, one part for practitioners that are supervisors (i.e. with a 
practitioner level of PractitionerLevel.OWNER or PractitionerLevel.ADMIN) and 
the second part for any remaining practitioners.

5. The submission must be a git repository link. The submission, once handed back in, 
will be run using dotnet run for the API and npm run dev for the UI. If changes are 
made require any additional (or different) steps before the code can be run, these 
instructions must be provided in a README file. Additionally, a brief explanation of what was 
implemented and how it achieves the business requirements must be provided alongside the 
code.

## How to run
### Front-end
Open command prompt at root of "coreplus-sample-ui".

Run the command "npm install" to install all the npm packages.

Now to run the application, execute command "npm run dev".

## Back-end
Open command prompt at root of "coreplus-sample-api".

Now execute the command "dotnet run".
