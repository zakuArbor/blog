---
title: "Disturbing Facts about Phoenix: Implementation Part 1"
published: true
---

---

**Disclaimer:** I do not claim to be an expert in any of the topics discussed below. Furthermore, I do not formally cite my sources but I will provide my list of sources below. I do not speak on behalf the Government, any companies mentioned in below nor as an employee of any organization that will be mentioned below. I simply am interested in the topic and decided to write a report to further learn about the issue. There will be parts of the blog that will resemble the Auditor General’s work. I am merely restating the Auditor General’s report along with any additional information I came across. The plan is to write a commentary at the end on my personal criticism of the project from both a software and political perspective.

---

The result after spending millions into Phoenix was a plaguing system. A complete failure from those who are responsible and those who have influenced the project to the state it is in right now. Indeed it was able to “replace” and centralize a Pay System for the 46 or so departments under the Federal Government. The new Payroll System did eliminate about 1200 pay advisors within the 46 departments/agencies in 2016. However, after the increased backlog that took months to process, the need to hire more payroll advisors increased and completely failed its original goals. Not only did it fail to cut the need for labor requirements in the payroll system, but it also did not save a single cent from the taxpayers' pocket. The goal was to save about $70 million/year starting in 2016/2017 fiscal. However, that was not what happened. The cost was expected to be $310 million but ended up costing $1.1 billion dollars of taxpayers’ money and is expected to rise to resolve the issue. In fact, a dozen satellite pay centers had to be set up to manage the problem.

<br/>

After reading the Auditor General’s report on [Building and Implementing the Phoenix Pay System](http://www.oag-bvg.gc.ca/internet/English/parl_oag_201805_01_e_43033.html), there were many disturbing facts that I cannot even comprehend how the Government even decided to release the system in the first place.

<br/>

Here’s a good summary from the Auditor General. Phoenix was implemented:
* without critical pay processing functions;
* without having been fully tested to see whether it would operate as expected;
* with significant security weaknesses, which meant that the system did not protect public servants’ private information;
* without an adequate contingency plan in case the system had serious and systemic problems after it was implemented; and
* without any plans to upgrade the underlying software application after it was no longer supported.
* PSPC did not fully consult and involve other departments and agencies during the development of Phoenix

Just from those points, it shocks me how no one stopped Phoenix from being released. The Government was notified about these facts but still decided to proceed with it. I question the integrity of the upper management of PSPC and those involved with the management of the software. If this ever happened in the Private Sector, I would not be surprised if all the management team are removed from their positions and replaced and probably fired in fact. It doesn’t take a genius to realize that this system was designed for failure.

---

<br/>

## IBM’s Involvement and the Controversy

As stated earlier in my [earlier blog](what-is-phoenix), IBM was contracted with customizing Oracle’s payroll system to fit the needs of the Federal Government. There are some controversy with IBM’s involvement with the project. Since it’s failure, many federal workers, the union, and MPs have accused IBM for the disaster and wanted IBM to be held responsible. Many will refer to IBM’s previous history with Queensland Health, a department in the Australian State of Queensland, as some justification or indication for the failure. IBM was chosen to also replace a payroll system for Queensland Health back in 2007 and like Phoenix “its rollout was plagued by delays and budget blowouts.” [1]

> “When it did go live, the system failed spectacularly, resulting in thousands of health workers being underpaid, overpaid, or not paid at all.
> The cost to taxpayers has been estimated at $1.2 billion and the debacle has been described as possibly the worst public administration failure in Australia.”

Doesn’t this situation sound very similar to Phoenix’s situation? This event occurred a few years before the release of Phoenix and should have alarmed PSPC. Just because IBM failed once, it doesn’t mean they will fail another time. However, the credibility and confidence of IBM’s ability to deliver the system do become a concern. PSPC should have consulted with Queensland Health and opened an investigation to learn more about the situation why the failure occurred and what they could have learned from their failures. This way PSPC and IBM could avoid repeating the same mistakes. However, it does not seem that IBM ever mentioned their experience with Queensland Health to PSPC. The biggest difference between Phoenix and the payroll system in Queensland Health was that IBM managed to fix the problem with Queensland Health after a few months of its release. There is one statement from Australia’s commissioner that I would like to share,

> IBM as a commercially motivated vendor doing little to rectify or make up for the State’s shortcomings [2]

I do believe in my own opinion that IBM has a personal commitment and responsibility to aggressively communicate to their clients about their shortcomings and problems with the deal, how they are proceeding with the project and any problems that IBM faces (which I believe they did communicated with the Government).

<br/>

To IBM’s credit, they did their job and did notified the executives of Phoenix of the issues with the system.

> IBM officials told the Senate that they flagged issues as early as summer 2015, and warned the government it was too soon to bring the system online in early 2016. The company advised the feds that the system could be ready by July or August 2016 – no sooner. But bureaucrats said that it had to be ready by April 2016 because it already started laying off compensation advisers tasked with handing out paycheques to employees. [5]

<br/>

## SO WHOSE FAULT IS IT?
**Short Answer:** The Phoenix Executives

**Long Answer:** Similarly to what the commissioner for Queensland Health stated, the blame is to lie with both parties. However, most of the fault lies with the Government. Although I stated that IBM has a personal responsibility to ensure the success of the project and the fact that IBM may have sold their experience and expertise too much to the clients, IBM should not be blamed for majority of the problem since IBM did technically (from my understanding) fulfilled their obligations to the project.

<br/>

The Auditor General believes it is the Phoenix executives who are mainly at fault for the whole problem. The problem I see on the news media is that this issue has become a political issue and is an embarrassment to those affected and to the taxpayers. There are many questions to ask but I’ll reserve it for another blog or section. You’ll soon quickly realize that it was clearly the Phoenix Executives fault for the system in the sections below.

---

<br/>

## IMPLEMENTATION FAULTS
In any software development, the software must pass a critical number of testing before implementing the project to the public. This avoids from catastrophe from occurring and have the system perform as it should be. However, according to the reports, Phoenix executives not only know that the system failed to pass some critical pay functions, such as processing requests for retroactive pay, they also:

* remove some pay processing functions,
* not test some pay processing functions,
* shorten the project schedule by compressing the time between the two waves of Phoenix from seven months to two months, and
* reduce the number of IBM and Public Services and Procurement Canada employees assigned to the development and implementation of Phoenix.

Reducing the scope of work to fit the approved budget will need careful considerations of the risk which I am sure the Phoenix executives did not even consider at all looking at the above actions and also with the following statement from the report:

> Phoenix executives did not re-examine the system’s expected benefits after they decided to significantly scale back what Phoenix would do. They should have known that such a significant change in the project scope could put the system’s functionality and projected savings at risk and undermine the government’s ability to pay its employees the right amount at the right time. [3]

Due to the changes the Phoenix’s executives made, they decided to defer or remove more than 100 important pay processing functions, including the ability to:

* process requests for retroactive pay, such as acting pay, which is provided to an employee acting in a temporary role for a superior;
* notify employees by email of actions required on their part to process pay requests; and
* automatically calculate certain types of pay, such as increases in pay for acting appointments.

You should never defer a problem for later, especially if they are major issues. They should know through common sense or by the idea of entropy that leaving a problem for later does not mean the problem does not go away or decrease but rather can potentially increase. Imagine having an infection in your arm. Deciding that it’s a problem for you to tackle later can result in having your arm amputated because the infection could and probably will spread throughout your arm and towards other parts of your body and you can also die as a result of it. It turns out that Phoenix was planning to have these important functions of the pay system to be added after all 101 Departments in the Federal Government and Agencies were added to the system. This is a ridiculous move by the Phoenix executives because they planned on forwarding the problem faced by 34 departments to the entire federal government. This decision to either remove or defer these functions has led to an enormous amount of outstanding pay requests and pay errors [3].

<img src = "https://i2.wp.com/www.oag-bvg.gc.ca/internet/images/content/parl_oag_201711_01_02_e.png" alt = "A graph showing how fast the backlog for pay requests over each month starting from February to June" class="center"/>

<center>Exhibit 1.2 — The number of public servants with outstanding pay requests in 46 departments and agencies quadrupled since Phoenix was launched [3]</center>

I agree with the auditor general with the statement “these weaknesses were serious enough that the system should not have been implemented”. “[The] Department knew about many of these critical weaknesses before implementing the Phoenix system” [3]. I wonder who was in charge of this project because I am questioning the credentials of the executives of Phoenix.

> Testing and piloting should have taken place to confirm the weaknesses, to determine whether there were more, and to fix or mitigate them.[3]

The very fact that this statement above has to come from the auditor general means this project was doom to failure. Which idiot does not roll out a pilot testing and ensure that critical tests all passed before releasing the software. That’s equivalent to designing and manufacturing a drug without any or much testing and release it to the public. That is a recipe for disaster. Thousands of lives could be at stake for such an idiotic move. Here are some quotes from the auditor general about what they found about testing the project [3]:

> For the remaining 81 functions we reviewed, we found that 20% did not pass testing by Public Services and Procurement Canada before implementation.

> We also found that Public Services and Procurement Canada did not test Phoenix as a whole system before implementation and did not know whether it would operate as intended. For example, the Department did not complete the final testing of Phoenix by pay advisors.

> in June 2015, Phoenix executives cancelled the pilot because of major defects that affected critical functions and outstanding problems with system stability, and they did not have enough time to reschedule the pilot without delaying Phoenix implementation. They decided that rather than delaying Phoenix, there would be no pilot.

Although my lack of experience and background, I can ensure you that even a student that studies Computer Science that I find these reports to be alarming and quite shocking to me to see how incompetent the executives are. I am going to assume none of these executives have ever dealt with anything related to managing software in their life nor have any knowledge about software development. PSPC had planned to conduct a pilot implementation with one department. That’s an excellent idea until the executives decided to cancel the pilot project. As the AG (auditor general) stated, “A pilot would have allowed the Department to determine if the system would work in a real setting without affecting pay that was still being processed by the old pay system.” [3]. The failure of PSPC was they “did not assess the impacts of canceling the pilot.” [3]. As a department that specializes in Procurement, they should have done an assessment. Perhaps, there was no need for a pilot test because various payroll functions were not implemented and others failed the test so it would have been pointless to even do a pilot test in the first place if they ever had one. But a pilot test would have slapped the executives to reality that this system was not even going to work.

<br/>

When I work on a project for class, I have to ensure that each function I implement does what it is supposed to do and pass various test cases. Not only do I ensure the functions pass their test cases but I also do various pilot tests to ensure the program works as expected when interacting with other components of my program. No student is foolish enough to not test their program (unless the deadline does not permit it and keep in mind that deadlines are fixed in school). Phoenix had the power and ability to push the release date further back to ensure that the program works as expected. They are not in a situation like students who have no say to the deadlines that their professor gives them. But most students do test their programs because there are many things at risk. A failure to test our program can cost us our grades, tuition, and reputation to be at stake. Perhaps executives should face consequences like students and any other employee such as pay deductions, demotion, or just outright being fired. I want to emphasize the fact that no code is ever perfect nor is anyone perfect so we do make mistakes. However, there has to be a line drawn to how far can one make a mistake and reflect on their performance. The executives of Phoenix had prior knowledge of the program’s downfalls but were still ignorant to think logically which shows how incompetent they are. I am not knowledgeable on the executives' backgrounds but I am questioning the Government’s selection of executives because I hope they have experience with procurement, project management, and general knowledge of how software development works.

<br/>

Off on a small tangent, reading one of the recommendation given to PSPC, it shocks me if they have any business knowledge at all.

> Its project managers understand and communicate to concerned stakeholders the impacts of any changes to functionality, including any impacts of the cumulative effect of all changes.

I thought this was an obvious knowledge for those in the field of project management and procurement. I have taken a course CSC290, Communication for Computer Scientists, and we were taught this idea and we are not in Business majors or in Software Engineering. However, it doesn’t take a genius to understand this very idea nor does it need to be taught to know the very idea. Any rational person who takes their work seriously would understand that any changes made from the plan need to be relayed to our manager and customers. This is not software specific. If an engineer or mechanic decides that a change needs to be made to a car design, the project manager needs to know what exactly the changes are and its impact. The stakeholders who invested money into the project or are impacted by the changes directly in their line of work should have been notified of the changes or at least notified implicitly if it doesn’t impact them directly. PSPC did notify the departments of the change but was vague and did not provide sufficient instructions on what to do nor of its impact on the customer (the departments). Removing and modifying some pay functions requires the clients (departments) to make changes in how they are going to process payments and so should be guided on how to deal with the changes or work with them on a solution and also provide the news on a timely manner to minimize the impact of the customers.

<br/>

The Phoenix executives decision to remove pay functions, not heed warnings and pilot testing seems to be a series of ridiculous moves to release the project as fast as possible to get over with the project and earn some reward for finishing the project as fast as possible while limiting costs as much as possible. Some quotes to support this are:

> They decided that rather than delaying Phoenix, there would be no pilot.

> We found that Public Services and Procurement Canada did not consider asking the Treasury Board for more money to build and implement Phoenix. Instead, Phoenix executives decided to work with IBM to find ways to reduce the scope of work to fit the approved budget. As a result, Phoenix executives decided to

> Phoenix executives prioritized certain aspects, such as schedule and budget, over other critical ones, such as functionality and security.

I am unsure whether or not the executives ever faced consequences but in my own bias opinion and potentially incorrect thinking, I believe they got away without any percussion and potentially were rewarded bonuses while thousands of public workers are suffering from their lack of oversight. There are too many problems with Phoenix since it’s planning to even after its release, that I am seriously worried about the potential replacement for Phoenix that may occur in the very near future and any major IT procurement in the future. I would suggest those who want to know about Phoenix in more detail or know other problematic aspects of Phoenix to read the Auditor-General Report listed below. I have not even gone through the entire problem of Phoenix but I am sure what I covered already shows how Phoenix was designed for failure.

---

<br/>

## Sources

1. [https://www.smh.com.au/technology/queensland-health-payroll-fail-government-ordered-to-pay-ibm-costs-20160404-gnxpqj.html](https://www.smh.com.au/technology/queensland-health-payroll-fail-government-ordered-to-pay-ibm-costs-20160404-gnxpqj.html)
2. [https://www.itnews.com.au/news/ibm-should-never-have-been-appointed-finds-qld-payroll-inquiry-352362](https://www.itnews.com.au/news/ibm-should-never-have-been-appointed-finds-qld-payroll-inquiry-352362)
3. [http://www.oag-bvg.gc.ca/internet/English/parl_oag_201805_01_e_43033.html#p31](http://www.oag-bvg.gc.ca/internet/English/parl_oag_201805_01_e_43033.html#p31)
4. [http://www.oag-bvg.gc.ca/internet/English/parl_oag_201711_01_e_42666.html](http://www.oag-bvg.gc.ca/internet/English/parl_oag_201711_01_e_42666.html)
5. [https://ipolitics.ca/2018/03/28/dont-blame-us-for-phoenix-failures-ibm-officials-tell-senate/](https://ipolitics.ca/2018/03/28/dont-blame-us-for-phoenix-failures-ibm-officials-tell-senate/)

**Reports:**

[Report 1 - Building and Implementing the Phoenix Pay System](http://www.oag-bvg.gc.ca/internet/English/parl_oag_201805_01_e_43033.html)
[Report 1 - Phoenix Pay Problems](http://www.oag-bvg.gc.ca/internet/English/parl_oag_201711_01_e_42666.html)