import json

def generate_applying_citizenship_questions():
    questions = [
        {
            "id": 1,
            "question": "What is the age requirement for taking the citizenship test?",
            "options": [
                "18-54 years old",
                "16-54 years old",
                "18-65 years old",
                "No age requirement"
            ],
            "correct_answer": "18-54 years old",
            "explanation": "Immigrants between the ages of 18 and 54 must take the citizenship test and have adequate knowledge of English or French."
        },
        {
            "id": 2,
            "question": "What happens after passing the citizenship test?",
            "options": [
                "Immediate citizenship granted",
                "Receive Notice to Appear to Take the Oath of Citizenship",
                "Additional interview required",
                "Wait for 1 year"
            ],
            "correct_answer": "Receive Notice to Appear to Take the Oath of Citizenship",
            "explanation": "After passing the test and meeting all requirements, you receive a Notice to Appear to Take the Oath of Citizenship with ceremony details."
        },
        {
            "id": 15,
            "question": "What is required to prepare for the citizenship test?",
            "options": [
                "Only study the guide",
                "Only take language classes",
                "Study guide, practice questions, and take language classes if needed",
                "Only practice with friends"
            ],
            "correct_answer": "Study guide, practice questions, and take language classes if needed",
            "explanation": "To prepare for the citizenship test, you should study the guide, practice questions with others, and take English or French language classes if needed."
        }
    ]
    return questions

def generate_rights_responsibilities_questions():
    questions = [
        {
            "id": 3,
            "question": "What are the fundamental freedoms in Canada according to the Charter?",
            "options": [
                "Only freedom of speech",
                "Only freedom of religion",
                "Freedom of conscience, religion, thought, expression, assembly, and association",
                "Only freedom of assembly"
            ],
            "correct_answer": "Freedom of conscience, religion, thought, expression, assembly, and association",
            "explanation": "The Charter secures fundamental freedoms including conscience, religion, thought, belief, opinion, expression, peaceful assembly, and association."
        },
        {
            "id": 4,
            "question": "What is one of the main responsibilities of Canadian citizens?",
            "options": [
                "Serving in the military",
                "Speaking both official languages",
                "Obeying the law",
                "Working for the government"
            ],
            "correct_answer": "Obeying the law",
            "explanation": "One of Canada's founding principles is the rule of law. All individuals and governments must obey the law."
        },
        {
            "id": 5,
            "question": "What is the status of men and women in Canada?",
            "options": [
                "Men have more rights",
                "Women have more rights",
                "Equal under the law",
                "Depends on the province"
            ],
            "correct_answer": "Equal under the law",
            "explanation": "In Canada, men and women are equal under the law."
        }
    ]
    return questions

def generate_aboriginal_peoples_questions():
    questions = [
        {
            "id": 6,
            "question": "What are the three distinct groups of Aboriginal peoples in Canada?",
            "options": [
                "First Nations, Inuit, and Métis",
                "Indians, Eskimos, and Natives",
                "Tribes, Bands, and Clans",
                "Huron, Cree, and Dene only"
            ],
            "correct_answer": "First Nations, Inuit, and Métis",
            "explanation": "The term Aboriginal peoples refers to three distinct groups: First Nations (formerly called Indians), Inuit, and Métis."
        },
        {
            "id": 7,
            "question": "What percentage of Aboriginal people are First Nations?",
            "options": [
                "30%",
                "45%",
                "65%",
                "80%"
            ],
            "correct_answer": "65%",
            "explanation": "About 65% of Aboriginal people are First Nations, while 30% are Métis and 4% are Inuit."
        },
        {
            "id": 8,
            "question": "What historical event did the federal government apologize for in 2008?",
            "options": [
                "Land treaties",
                "Residential schools",
                "Voting restrictions",
                "Language bans"
            ],
            "correct_answer": "Residential schools",
            "explanation": "In 2008, Ottawa formally apologized to former students of residential schools, where Aboriginal children faced hardships and were prohibited from using their languages and cultural practices."
        }
    ]
    return questions

def generate_history_questions():
    questions = [
        {
            "id": 9,
            "question": "Who was the first European to map Canada's Atlantic shore?",
            "options": [
                "Jacques Cartier",
                "John Cabot",
                "Samuel de Champlain",
                "Vikings"
            ],
            "correct_answer": "John Cabot",
            "explanation": "John Cabot was the first to map Canada's Atlantic shore in 1497, setting foot on Newfoundland or Cape Breton Island."
        },
        {
            "id": 10,
            "question": "What is the origin of the name 'Canada'?",
            "options": [
                "British word for colony",
                "French word for village",
                "Iroquoian word for village",
                "Portuguese word for path"
            ],
            "correct_answer": "Iroquoian word for village",
            "explanation": "The name Canada comes from the Iroquoian word 'kanata', meaning 'village', which Jacques Cartier heard from two captured guides."
        },
        {
            "id": 11,
            "question": "What significant event happened in 1774 through the Quebec Act?",
            "options": [
                "Quebec became independent",
                "Catholics gained religious freedom and right to hold public office",
                "French became the only official language",
                "Quebec joined the United States"
            ],
            "correct_answer": "Catholics gained religious freedom and right to hold public office",
            "explanation": "The Quebec Act of 1774 allowed religious freedom for Catholics and permitted them to hold public office, a practice not then allowed in Britain."
        },
        {
            "id": 16,
            "question": "Who was Canada's first Prime Minister?",
            "options": [
                "Sir John A. Macdonald",
                "Sir Wilfrid Laurier",
                "Sir George-Étienne Cartier",
                "Louis Riel"
            ],
            "correct_answer": "Sir John A. Macdonald",
            "explanation": "Sir John Alexander Macdonald became Canada's first Prime Minister in 1867. His portrait is on the $10 bill."
        },
        {
            "id": 17,
            "question": "When did Canada officially become a country?",
            "options": [
                "1864",
                "1867",
                "1871",
                "1873"
            ],
            "correct_answer": "1867",
            "explanation": "The Dominion of Canada was officially born on July 1, 1867, when the British North America Act was passed."
        },
        {
            "id": 18,
            "question": "What was the significance of the Battle of Vimy Ridge in 1917?",
            "options": [
                "It ended World War I",
                "It was Canada's first military defeat",
                "It established Canada's reputation as 'shock troops of the British Empire'",
                "It led to Canadian independence"
            ],
            "correct_answer": "It established Canada's reputation as 'shock troops of the British Empire'",
            "explanation": "The Canadian Corps captured Vimy Ridge in April 1917, securing Canadians' reputation for valor as the 'shock troops of the British Empire.'"
        }
    ]
    return questions

def generate_government_questions():
    questions = [
        {
            "id": 19,
            "question": "What type of government system was established at Confederation?",
            "options": [
                "Single level government",
                "Two levels: federal and provincial",
                "Three levels including municipal",
                "Colonial government"
            ],
            "correct_answer": "Two levels: federal and provincial",
            "explanation": "The Fathers of Confederation created two levels of government: federal and provincial, with each province having control over areas like education and health."
        },
        {
            "id": 20,
            "question": "What is responsible government in Canada?",
            "options": [
                "Government that responds to all requests",
                "Government that must resign if it loses a confidence vote",
                "Government that is responsible for everything",
                "Government that reports to Britain"
            ],
            "correct_answer": "Government that must resign if it loses a confidence vote",
            "explanation": "Under responsible government, if the government loses a confidence vote in the assembly, it must resign."
        }
    ]
    return questions

def generate_womens_rights_questions():
    questions = [
        {
            "id": 21,
            "question": "Who was the founder of the women's suffrage movement in Canada?",
            "options": [
                "Laura Secord",
                "Dr. Emily Stowe",
                "Agnes Macphail",
                "Mary Ann Shadd Cary"
            ],
            "correct_answer": "Dr. Emily Stowe",
            "explanation": "Dr. Emily Stowe, the first Canadian woman to practice medicine in Canada, founded the women's suffrage movement in Canada."
        },
        {
            "id": 22,
            "question": "Which province was the first to grant women the right to vote?",
            "options": [
                "Ontario",
                "Quebec",
                "Manitoba",
                "British Columbia"
            ],
            "correct_answer": "Manitoba",
            "explanation": "In 1916, Manitoba became the first province to grant voting rights to women."
        }
    ]
    return questions

def generate_modern_canada_questions():
    questions = [
        {
            "id": 23,
            "question": "What is Canada's official policy regarding cultural diversity?",
            "options": [
                "Assimilation",
                "Multiculturalism",
                "Segregation",
                "Cultural isolation"
            ],
            "correct_answer": "Multiculturalism",
            "explanation": "Multiculturalism is a fundamental characteristic of Canadian heritage and identity. Canadians celebrate diversity and work to respect pluralism and live in harmony."
        },
        {
            "id": 24,
            "question": "What are the two official languages of Canada?",
            "options": [
                "English and French",
                "English and Spanish",
                "French and Indigenous languages",
                "English and Chinese"
            ],
            "correct_answer": "English and French",
            "explanation": "English and French are Canada's official languages and have equal status in Parliament and throughout the government."
        }
    ]
    return questions

def generate_economy_questions():
    questions = [
        {
            "id": 25,
            "question": "What was one of the first major companies in Canada?",
            "options": [
                "Canadian Pacific Railway",
                "Hudson's Bay Company",
                "Air Canada",
                "Bell Canada"
            ],
            "correct_answer": "Hudson's Bay Company",
            "explanation": "The Hudson's Bay Company, with French, British and Aboriginal employees, was one of the first companies and dominated the fur trade."
        },
        {
            "id": 26,
            "question": "When did the Montreal Stock Exchange open?",
            "options": [
                "1812",
                "1832",
                "1852",
                "1872"
            ],
            "correct_answer": "1832",
            "explanation": "The Montreal Stock Exchange opened in 1832, as part of the development of financial institutions in the late 18th and early 19th centuries."
        }
    ]
    return questions

def generate_regions_questions():
    questions = [
        {
            "id": 27,
            "question": "Which was the last province to join Confederation?",
            "options": [
                "British Columbia",
                "Prince Edward Island",
                "Newfoundland and Labrador",
                "Alberta"
            ],
            "correct_answer": "Newfoundland and Labrador",
            "explanation": "Newfoundland and Labrador joined Confederation in 1949, making it the last province to join Canada."
        },
        {
            "id": 28,
            "question": "What is Canada's newest territory?",
            "options": [
                "Yukon",
                "Northwest Territories",
                "Nunavut",
                "None of the above"
            ],
            "correct_answer": "Nunavut",
            "explanation": "Nunavut, created in 1999, is Canada's newest territory."
        }
    ]
    return questions

def generate_justice_system_questions():
    questions = [
        {
            "id": 29,
            "question": "What is the origin of Canadian law?",
            "options": [
                "Only British common law",
                "Only French civil law",
                "Both British common law and French civil law",
                "Only Aboriginal law"
            ],
            "correct_answer": "Both British common law and French civil law",
            "explanation": "Canadian law has several sources, including English common law and the civil code of France."
        },
        {
            "id": 30,
            "question": "What is the role of the RCMP?",
            "options": [
                "Provincial police only",
                "Municipal police only",
                "National police force",
                "Military police"
            ],
            "correct_answer": "National police force",
            "explanation": "The Royal Canadian Mounted Police (RCMP) serves as Canada's national police force."
        }
    ]
    return questions

def generate_symbols_questions():
    questions = [
        {
            "id": 31,
            "question": "What are Canada's official colors?",
            "options": [
                "Blue and white",
                "Red and white",
                "Red and blue",
                "White and blue"
            ],
            "correct_answer": "Red and white",
            "explanation": "Red and white were designated as Canada's official colors by King George V in 1921."
        },
        {
            "id": 32,
            "question": "What is the significance of the maple leaf in Canadian symbolism?",
            "options": [
                "Just a common tree",
                "National symbol since 1850s",
                "Recent addition to flag",
                "Represents provinces"
            ],
            "correct_answer": "National symbol since 1850s",
            "explanation": "Canada's soldiers began using the maple leaf as a symbol in the 1850s, and it has been a cherished Canadian symbol ever since."
        }
    ]
    return questions

def generate_canada_questions():
    questions = {
        "bookTitle": "Discover Canada - Complete Guide",
        "chapters": [
            {
                "chapterName": "Applying for Citizenship",
                "questions": generate_applying_citizenship_questions()
            },
            {
                "chapterName": "Rights and Responsibilities of Citizenship",
                "questions": generate_rights_responsibilities_questions()
            },
            {
                "chapterName": "Aboriginal Peoples",
                "questions": generate_aboriginal_peoples_questions()
            },
            {
                "chapterName": "Canadian History",
                "questions": generate_history_questions()
            },
            {
                "chapterName": "Government and Democracy",
                "questions": generate_government_questions()
            },
            {
                "chapterName": "Women's Rights and Equality",
                "questions": generate_womens_rights_questions()
            },
            {
                "chapterName": "Modern Canada",
                "questions": generate_modern_canada_questions()
            },
            {
                "chapterName": "Canadian Economy",
                "questions": generate_economy_questions()
            },
            {
                "chapterName": "Canada's Regions",
                "questions": generate_regions_questions()
            },
            {
                "chapterName": "Justice System",
                "questions": generate_justice_system_questions()
            },
            {
                "chapterName": "Canadian Symbols",
                "questions": generate_symbols_questions()
            }
        ]
    }
    
    # Save questions to JSON file
    with open('assets/questions_canada.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=2)

if __name__ == "__main__":
    generate_canada_questions() 