function removeAllOptions(element) {
  while (element.options.length > 0) {
    element.remove(0);
  }
}

const animalClassifications = {
  Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
  Turtle: ['Vertebrate', 'Cold-blooded'],
  Whale: ['Vertebrate', 'Warm-blooded', 'Mammal'],
  Salmon: ['Vertebrate', 'Cold-blooded'],
  Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird'],
};

const classifications = document.getElementById('animal-classifications');
const animals = document.getElementById('animals');
const clearButton = document.getElementById('clear');

const classificationOptions = Array.from(classifications.options);
const animalOptions = Array.from(animals.options);

classifications.addEventListener('change', (event) => {
  const selection = event.target.value;

  removeAllOptions(animals);

  const selectedAnimals = Object.entries(animalClassifications)
    .filter(([_, v]) => v.includes(selection))
    .map(([k, _]) => k);

  for (const animal of animalOptions) {
    if(selectedAnimals.includes(animal.value)) {
      animals.add(animal);
    }
  }
  animals.selectedIndex = 0;
});

animals.addEventListener('change', (event) => {
  const selection = event.target.value;

  removeAllOptions(classifications);

  const selectedClassifications = animalClassifications[selection];

  for (const classification of classificationOptions) {
    if (selectedClassifications?.includes(classification.value)) {
      classifications.add(classification);
    }
  }
  classifications.selectedIndex = 0;
});

clearButton.addEventListener('click', (event) => {
  event.preventDefault();

  for (const animal of animalOptions) {
    animals.add(animal);
  }

  animals.selectedIndex = 0;

  for (const classification of classificationOptions) {
    classifications.add(classification);
  }

  classifications.selectedIndex = 0;
});

