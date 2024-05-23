document.addEventListener("DOMContentLoaded", () => {
    const textDisplay = document.getElementById('text-display');

    const titleSection = "<p><strong>Performing Shame.</strong></p>";
    const sections = [
        "Homi Bhabha writes that power wants to be mimicked, because it wants to be replicated further down the pecking order, but also it wants to be mimicked because it doesn't want to be fully replicable by those further down, because then they might actually attain some kind of real power which would disrupt the hierarchy.<p>Mimicry seems like a very helpful idea for thinking about how my performances aim to re-enact already existing power relations in a kind of shoddy, unserious, theatrical form. I want to make sense of this because my performer Daniel Oliver had this critique about my work which goes something like: Saying that a cruel performance is about power is like pushing somebody over, and when they say, 'Hey you just pushed me over', replying, 'Yeah but that’s what it was about’.<p>But what's actually happening in my work is mimicry: an act of repetition that is necessarily imperfect, and therefore ironic and comic. A mimicry of power relations whose ambivalence might disrupt the surety of the power relations being mimicked.",        
        "There is one bit in <I>In Hell</I> that is interesting in relation to mimicry. At the end of the performance titled Talking About Shame in Hell, we all chant 'shame' at each other. But when it comes to Tammy's turn to be shamed, Dan stops chanting it after a few repetitions. We have a short discussion about it, and it turns out that he suddenly feels ashamed for shaming Tammy, and doesn't want to carry on. Even though the mimicry of shaming is absurdly over the top, (who ever chants 'shame' at someone?) it suddenly produces real shame - not in Tammy, but in Daniel.",
	"I went to a relational aesthetics exhibition and got a bowl of beef congee. It cost five pounds. Relational aesthetics should be free, I thought to myself as I tapped my phone on the artist’s contactless payment reader.<p>There was one other visitor to the gallery. While I ate my congee, I chatted with the artist and the other visitor about art schools. The artist had recently graduated from the RCA which he said was awful. Speaking from my perspective as a lecturer, I told them about my precarious contract, the endless administrative work and how the students didn’t have any studio space. Me and the artist agreed on the terrible state of art education but the other visitor said that he thought artists just liked to complain. <p>It was true, I thought. I did like to complain.",
	"Do you remember the great irony vs sincerity debates of the 2000s? Irony was seen as dangerous, decadent, cynical. But it seems to me now that it was a misunderstanding of irony. As though irony was always some kind of intentional pose or stance that was meant to achieve something in particular. As though the problem with irony might be its lack of efficacy. It was funny that people had believed that the opposite of irony was sincerity. Like somehow believing in what you did made it less ambiguous.",
	"Much of the meaning of a performance rested on how a piece was summarised and circulated amongst a tertiary audience who knew a performance only through its anecdotal retelling. In this sense – and to paraphrase Philip Auslander – a reductive summary of a performance constitutes it as a performance as such. It is unnecessary for there to be a primary event of performance, or documentation that reconstructs the performance’s status as an event for a secondary audience. All that is required is for the work to be repeatedly summarised and referenced. Each time this takes place the performance’s status as a performance is reconstituted through description.",
	"‘I mean, so I have this relationship with shame where I'm always very noticeable, so I can’t really hide things as easily.<p>Because I’m so visible, and people are always watching me and perceiving me all the time, then having shame is really a waste of time.<p>Like I have a more significant impatience with it, where I can’t be arsed to be ashamed.<p>Like, embarrassing things happen to me all the time like they do with everybody, but mine are like seen a lot more which is always quite interesting.<p>I guess that’s probably why I started performing.’",
	"‘Well, guilt, embarrassment and shame are all definitely related. But the way I would categorise them is, like embarrassment, something happens, and it’s embarrassing, but everyone recognises it hasn’t breached any like, norms.<p>Guilt is like an event isn’t it, or something, an action that you’ve done that there’s responsibility for.<p>And shame is more this idea of being visible in the eyes of others, and everyone being very keen to locate that [feeling] in one person’s body. Because that’s what’s weird right? When you feel shame it’s often because other people are feeling shame about you.’"
     ];

    let remainingSections = [...sections];
    const finalMessage = "<p>Matthew de Kersaint Giraudeau, 2024</p>";
    let firstClick = true;

    function getRandomSection() {
        if (remainingSections.length === 0) {
            return finalMessage;
        }
        const randomIndex = Math.floor(Math.random() * remainingSections.length);
        const section = remainingSections.splice(randomIndex, 1)[0];
        return section;
    }

    function displayNextSection() {
        let section;
        if (firstClick) {
            section = titleSection;
            firstClick = false;
        } else {
            section = getRandomSection();
        }
        textDisplay.innerHTML = section; // Use innerHTML to render HTML content
        if (section === finalMessage) {
            textDisplay.removeEventListener('click', displayNextSection); // Remove click event listener
            textDisplay.style.cursor = 'auto'; // Change cursor back to default
        }
    }

    textDisplay.addEventListener('click', displayNextSection);

    // Display the first section (title) on load
    displayNextSection();
});
