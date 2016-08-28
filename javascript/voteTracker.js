var allVotes = {};
var numEntries = 0;
var isSorted = false;
var lastVote;

$(document).ready(function() {
	initializeData();

	$('#submitVote').click(function() {
		entryNumber = $('#voteNum').val();
		$('#voteNum').val("");

		if(Boolean(entryNumber) && entryNumber != ' ' && entryNumber != 0){
			isSorted = false;

			index = indexOfEntryNumber(entryNumber);
			lastVote = entryNumber;

			if(index >= 0){
				currentEntry = allVotes[index];
				currentEntry.votes += 1;

				if (typeof(Storage) !== "undefined") {
					localStorage.setItem(currentEntry.number, currentEntry.votes);
				}
			}
			else {
				allVotes[numEntries] = {number: entryNumber, votes: 1};
				numEntries++;

				if (typeof(Storage) !== "undefined") {
					localStorage.setItem(entryNumber, 1);
				}
			}
			$("#lastVote").html("<p class='green'>" + lastVote + " added! </p>");

		}
	});

	$("#undo").click(function() {
		index = indexOfEntryNumber(entryNumber);
		currentEntry = allVotes[index];
		currentEntry.votes = currentEntry.votes - 1;
		numEntries--;

		$("#lastVote").html("<p class='red'>" + lastVote + " removed! </p>");
	});

	$('#getTopVotes').click(function() {
		topEntries = $('#numVotes').val();
		if(topEntries <= numEntries){
			displayVotes(topEntries);
		} else {
			displayVotes(numEntries);
		}

		$('#numVotes').val("");
	});

	$('#displayAllVotes').click(function() {
		displayVotes(numEntries);
	});

});

function initializeData(){
	if(localStorage.length > 0){
		for (var i = 0; i < localStorage.length; i++){
			key = localStorage.key(i);
			value = localStorage.getItem(key);
		    allVotes[i] = {number: key, votes: parseInt(value)};
		}
		numEntries = localStorage.length;
	}
}

function indexOfEntryNumber(number){
	for(var i=0; i<numEntries; i++){
		if(allVotes[i].number == number){
			return i;
		}
	}
	return -1;
}

function displayVotes(numberOfEntries){
	if (!isSorted && numEntries > 1) {
		quickSort(allVotes, 0, numEntries - 1);
		isSorted = true;
	}

	buildHTML(numberOfEntries);
}

function buildHTML(numberOfEntries){
	var entryList;
	if(numberOfEntries && numberOfEntries > 0){
		entryList = "<br><h3>All Entries </h3>";

		for(var i=0; i < numberOfEntries; i++){
			entryList += "<p> Entry: " + allVotes[i].number + " Votes: " + 
				allVotes[i].votes + "</p>";
		}
	} else{
		entryList = "<br><h3>No Entries </h3>";
	}
	$("#voteDisplay").html(entryList);

}

function quickSort(items, left, right) {

    var index;
    var length = right - left;

    if (length > 1) {

        index = partition(items, left, right);

        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }

        if (index < right) {
            quickSort(items, index, right);
        }

    }

    return items;
}

function partition(items, left, right) {

    var pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;


    while (i <= j) {

        while (items[i].votes > pivot.votes) {
            i++;
        }

        while (items[j].votes < pivot.votes) {
            j--;
        }

        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }

    return i;
}

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}
