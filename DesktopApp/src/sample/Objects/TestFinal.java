package sample.Objects;

import java.util.ArrayList;

public class TestFinal {
    private String testNmae;
    private String resultID;
    private ArrayList<QuestionsFinal> questions = new ArrayList<QuestionsFinal>();

    public TestFinal(TestPrototype prototype) {
        //System.out.println(prototype.getResultID());
        this.questions = new ArrayList<QuestionsFinal>();
        this.testNmae=prototype.getTestName();

            this.resultID = prototype.getResultID();

        for (QuestionPrototype swap:prototype.getTestQuestionPrototypes()) {
            int swapId = swap.getQuestionID();
            boolean exist = false;
            if (this.questions == null) {
                this.questions.add(new QuestionsFinal(swapId,swap.getQuestionText(),swap.getAnswerText(),swap.getAnswerID()));
            }
            for (QuestionsFinal swap2:this.questions) {
                if (swap2.getQuestionID() == swapId){
                    swap2.getAnswers().add(new AnswerFinal(swap.getAnswerText(),swap.getAnswerID()));
                    exist = true;
                    break;
                }
            }
            if (exist){}
            else {
                this.getQuestions().add(new QuestionsFinal(swapId,swap.getQuestionText(),swap.getAnswerText(),swap.getAnswerID()));
            }
        }
    }

    public void printTest(){
        System.out.println(this.testNmae);
        for (QuestionsFinal questions:this.getQuestions()) {
            System.out.println("\t"+questions.getQuestionText());
            for (AnswerFinal answers:questions.getAnswers()) {
                System.out.println("\t\t"+answers.getAnswerText());
            }
        }
    }

    public String getTestNmae() {
        return testNmae;
    }

    public void setTestNmae(String testNmae) {
        this.testNmae = testNmae;
    }

    public ArrayList<QuestionsFinal> getQuestions() {
        return questions;
    }

    public void setQuestions(ArrayList<QuestionsFinal> questions) {
        this.questions = questions;
    }

    public String getResultID() {
        return resultID;
    }

    public void setResultID(String resultID) {
        this.resultID = resultID;
    }
}
