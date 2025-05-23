class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData["Title"]); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData["InitialLocation"]); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData["Locations"]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData[key]["Body"]); // TODO: replace this text by the Body of the location data
        
        if(locationData[key]["Choices"].length) { // TODO: check if the location has any Choices
            for(let choice of locationData[key]["Choices"]) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
        if(key == "Playroom"){
            this.engine.storyData["Capo"] = true;
            this.engine.storyData["Locations"]["Bedroom"]["Body"] = "My bedroom, the place closest to my heart. My whole life lies within these walls. Now I can play my guitar.";
            this.engine.storyData["Locations"]["Bedroom"]["Choices"].push({"Text":"Play the guitar","Target":"Play Guitar"});
            //console.log(this.engine.storyData["Capo"]);
            //console.log(this.engine.storyData["Locations"]["Choices"]);
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; " + choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');