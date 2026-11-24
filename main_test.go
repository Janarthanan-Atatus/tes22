package main

import "testing"

func TestGreet(t *testing.T) {
	got := Greet("Git")
	want := "Hello, Git!"
	if got != want {
		t.Errorf("Greet() = %q, want %q", got, want)
	}
}
