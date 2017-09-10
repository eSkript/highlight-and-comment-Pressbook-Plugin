// README
// BASIC FUNCTIONALITY OF THIS SCRIPT:
//   (A.) HIGHLIGHT MARKED SECTION IN TEXT IN YELLOW
//   (B.) DELETE SPECIFIC HIGHLIGHT, WHEN RIGHT CLICK ON THAT
//        RESPECTIVE HIGHLIGHT.
// TO SEE THESES FUNCTIONALITIES IN ACTION,
//        DOWNLOAD THIS PACKAGE AND
//        START index.html
// FOLLOWING HAS TO BE MODIFIED TO MAKE THIS WORK IN ESKRIPT:
//   (1.) INCLUDE THIS SCRIPT IN EBOOK AS A PLUGIN OR SIMILAR COMPONENT
//   (2.) MODIFY THE FIRST TWO SUB-FUNCTIONS FROM THIS SCRIPT FOR
//        EBOOK (MATTER OF MAKING HIGHLIGHTS PERSISTENT IN THE SYSTEM)
//   (3.) INCLUDE THIS SCRIPT IN EBOOK CHAPTERS
//

$(function() {

    // TO BE MODIFIED FOR ESKRIPT
    function loadStoredHighlightsToDocument() {
        // USING FOLLOWING COMMAND, THE SERIALIZED HIGHLIGHTS CAN BE
        // LOADED IN THE CONNECTED DOCUMENT:
        // myHighlighter.deserializeHighlights(serializedHighlights);

        // IN FOLLOWING EXAMPLE, HIGHLIGHTS ARE LOADED FROM A STORED
        // JSON DOCUMENT. THIS WILL HAVE TO BE REPLACED BY THE RESPECTIVE
        // ESKRIPT FUNCTION.
        
        /*
        loadJSON(function(serializedHighlights) {
            // Parse JSON string into object
            myHighlighter.deserializeHighlights(serializedHighlights);
        });
        */
    }

    // TO BE MODIFIED FOR ESKRIPT
    function storeHighlightsFromDocument(serializedHighlights) {
        // IN THIS FUNCTION, THE ATTACHED VARIABLE serializedHighlights
        // HAS TO BE SAVED FOR THE RESPECTIVE USER AND DOCUMENT SUCH
        // THAT IT CAN BE LOADED AGAIN WITH THE ABOVE FUNCTION WHEN
        // THE USER REOPENS THE DOCUMENT.

        console.log(serializedHighlights);
    }



    var $context = $("#content");
    $(".entry-content").attr('id', 'highlighter_content');
    // THE DOCUMENT TO BE HIGHLIGHTED MUST HAVE id='my_content'
    // can be changed either here or in the document
    var my_content = document.getElementById('highlighter_content');
    console.log(my_content);
    var myHighlighter = new TextHighlighter(my_content),
        serialized;
    myHighlighter.removeHighlights();



    // here, existing highlights are loaded and added by an even listener
    loadStoredHighlightsToDocument();
    // event listener: on right mouse click, the clicked highlight disappears
    var allHighlights = document.getElementsByClassName("highlighted");
    for (var i = 0; i < allHighlights.length; i++) {
        allHighlights[i].addEventListener('contextmenu', function(ev) {
            ev.preventDefault();
            var respecticeTimestamp = element[0].outerHTML.split("data-timestamp=")[1].split("\"")[1];
            serialized = myHighlighter.serializeHighlights();
            myHighlighter.removeHighlights();
            var allHighlights = JSON.parse(serialized);
            var highlightsExceptRemovedOne = [];
            for (var i = 0; i < allHighlights.length; i++) {
                var currentEntry = allHighlights[i];
                if (currentEntry[0].indexOf(respecticeTimestamp) == -1) {
                    highlightsExceptRemovedOne.push(allHighlights[i]);
                }
            }
            serialized = JSON.stringify(highlightsExceptRemovedOne);
            myHighlighter.deserializeHighlights(serialized);
            var allHighlights = document.getElementsByClassName("highlighted");
            storeHighlightsFromDocument(serialized);

            return false;
        }, false);
    }


    $context.textHighlighter({
        onAfterHighlight: function(arr, element) {

            serialized = myHighlighter.serializeHighlights();
            storeHighlightsFromDocument(serialized);

            // deprecated
            document.cookie = "serialized=" + JSON.stringify(serialized);


            // event listener: on right mouse click, the clicked highlight disappears
            element[0].addEventListener('contextmenu', function(ev) {
                ev.preventDefault();
                var respecticeTimestamp = element[0].outerHTML.split("data-timestamp=")[1].split("\"")[1];
                serialized = myHighlighter.serializeHighlights();
                myHighlighter.removeHighlights();
                var allHighlights = JSON.parse(serialized);
                var highlightsExceptRemovedOne = [];
                for (var i = 0; i < allHighlights.length; i++) {
                    var currentEntry = allHighlights[i];
                    if (currentEntry[0].indexOf(respecticeTimestamp) == -1) {
                        highlightsExceptRemovedOne.push(allHighlights[i]);
                    }
                }
                serialized = JSON.stringify(highlightsExceptRemovedOne);
                myHighlighter.deserializeHighlights(serialized);


                var allHighlights = document.getElementsByClassName("highlighted");
                storeHighlightsFromDocument(serialized);

                return false;
            }, false);




        }
    });

});